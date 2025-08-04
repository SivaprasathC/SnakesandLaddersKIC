const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files
app.use(express.static('.'));

// Game rooms storage
const gameRooms = new Map();

// Generate room code
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Game state management
class GameRoom {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.players = [];
    this.gameState = {
      currentPlayer: 0,
      playerPositions: [1, 1],
      gameStarted: false,
      gameEnded: false,
      winner: null,
      lastDiceRoll: null
    };
    this.maxPlayers = 2;
  }

  addPlayer(playerId, playerName, socketId) {
    if (this.players.length < this.maxPlayers) {
      const player = {
        id: playerId,
        name: playerName,
        socketId: socketId,
        position: 1,
        playerIndex: this.players.length
      };
      this.players.push(player);
      return true;
    }
    return false;
  }

  removePlayer(socketId) {
    this.players = this.players.filter(player => player.socketId !== socketId);
    if (this.players.length === 0) {
      return true; // Room should be deleted
    }
    return false;
  }

  canStartGame() {
    return this.players.length === 2 && !this.gameState.gameStarted;
  }

  getCurrentPlayer() {
    return this.players[this.gameState.currentPlayer];
  }

  switchTurn() {
    this.gameState.currentPlayer = (this.gameState.currentPlayer + 1) % 2;
  }

  updatePlayerPosition(playerIndex, newPosition) {
    this.gameState.playerPositions[playerIndex] = newPosition;
    this.players[playerIndex].position = newPosition;
  }

  checkWin(position) {
    return position === 100;
  }
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Create new game room
  socket.on('createRoom', (data) => {
    const roomCode = generateRoomCode();
    const gameRoom = new GameRoom(roomCode);
    
    const playerId = uuidv4();
    gameRoom.addPlayer(playerId, data.playerName, socket.id);
    gameRooms.set(roomCode, gameRoom);
    
    socket.join(roomCode);
    socket.emit('roomCreated', {
      roomCode: roomCode,
      playerId: playerId,
      playerIndex: 0
    });
    
    console.log(`Room ${roomCode} created by ${data.playerName}`);
  });

  // Join existing room
  socket.on('joinRoom', (data) => {
    const gameRoom = gameRooms.get(data.roomCode);
    
    if (!gameRoom) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }
    
    if (gameRoom.players.length >= gameRoom.maxPlayers) {
      socket.emit('error', { message: 'Room is full' });
      return;
    }
    
    const playerId = uuidv4();
    gameRoom.addPlayer(playerId, data.playerName, socket.id);
    socket.join(data.roomCode);
    
    socket.emit('roomJoined', {
      roomCode: data.roomCode,
      playerId: playerId,
      playerIndex: gameRoom.players.length - 1
    });
    
    // Notify all players in room
    io.to(data.roomCode).emit('playerJoined', {
      players: gameRoom.players.map(p => ({ name: p.name, position: p.position })),
      canStart: gameRoom.canStartGame()
    });
    
    console.log(`${data.playerName} joined room ${data.roomCode}`);
  });

  // Start game
  socket.on('startGame', (data) => {
    const gameRoom = gameRooms.get(data.roomCode);
    
    if (!gameRoom || !gameRoom.canStartGame()) {
      socket.emit('error', { message: 'Cannot start game' });
      return;
    }
    
    gameRoom.gameState.gameStarted = true;
    
    io.to(data.roomCode).emit('gameStarted', {
      currentPlayer: gameRoom.getCurrentPlayer().name,
      playerIndex: gameRoom.gameState.currentPlayer
    });
    
    console.log(`Game started in room ${data.roomCode}`);
  });

  // Roll dice
  socket.on('rollDice', (data) => {
    const gameRoom = gameRooms.get(data.roomCode);
    
    if (!gameRoom || !gameRoom.gameState.gameStarted || gameRoom.gameState.gameEnded) {
      return;
    }
    
    const currentPlayer = gameRoom.getCurrentPlayer();
    if (currentPlayer.socketId !== socket.id) {
      socket.emit('error', { message: 'Not your turn' });
      return;
    }
    
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    gameRoom.gameState.lastDiceRoll = diceRoll;
    
    const currentPosition = currentPlayer.position;
    let newPosition = currentPosition + diceRoll;
    
    // Check if move is valid (can't go beyond 100)
    if (newPosition > 100) {
      newPosition = currentPosition; // Stay in same position
    }
    
    // Check for snakes and ladders
    const snakesAndLadders = {
      17: 36, 33: 15, 48: 70, 55: 27, 56: 77, 62: 20, 73: 94, // Ladders
      79: 44, 96: 76 // Snakes
    };
    
    if (snakesAndLadders[newPosition]) {
      newPosition = snakesAndLadders[newPosition];
    }
    
    gameRoom.updatePlayerPosition(currentPlayer.playerIndex, newPosition);
    
    // Check for win
    if (gameRoom.checkWin(newPosition)) {
      gameRoom.gameState.gameEnded = true;
      gameRoom.gameState.winner = currentPlayer.name;
      
      io.to(data.roomCode).emit('gameEnded', {
        winner: currentPlayer.name,
        winnerIndex: currentPlayer.playerIndex
      });
    } else {
      gameRoom.switchTurn();
      
      io.to(data.roomCode).emit('diceRolled', {
        diceValue: diceRoll,
        playerIndex: currentPlayer.playerIndex,
        oldPosition: currentPosition,
        newPosition: newPosition,
        nextPlayer: gameRoom.getCurrentPlayer().name,
        nextPlayerIndex: gameRoom.gameState.currentPlayer,
        playerPositions: gameRoom.gameState.playerPositions
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Find and remove player from any room
    for (const [roomCode, gameRoom] of gameRooms.entries()) {
      const shouldDeleteRoom = gameRoom.removePlayer(socket.id);
      
      if (shouldDeleteRoom) {
        gameRooms.delete(roomCode);
        console.log(`Room ${roomCode} deleted`);
      } else {
        // Notify remaining players
        io.to(roomCode).emit('playerLeft', {
          players: gameRoom.players.map(p => ({ name: p.name, position: p.position }))
        });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});