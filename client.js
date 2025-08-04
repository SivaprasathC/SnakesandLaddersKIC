// Socket connection
const socket = io();

// Game state
let gameState = {
    roomCode: null,
    playerId: null,
    playerIndex: null,
    playerName: null,
    isMyTurn: false,
    players: [],
    playerPositions: [1, 1]
};

// Audio elements
let bgAudio = null;
let soundEffects = {
    dice: null,
    snake: null,
    ladder: null,
    win: null
};

// Initialize audio
function initAudio() {
    bgAudio = document.getElementById('bgAudio');
    soundEffects.dice = new Audio('asset/dice-roll-sound.mp3');
    soundEffects.snake = new Audio('asset/snake_ahh.wav');
    soundEffects.ladder = new Audio('asset/ladderhur.wav');
    soundEffects.win = new Audio('asset/winsound.wav');
}

// Toggle background audio
function toggleAudio() {
    const button = document.getElementById('audiobg');
    if (bgAudio.paused) {
        bgAudio.play();
        button.textContent = 'Mute';
    } else {
        bgAudio.pause();
        button.textContent = 'Play Sound';
    }
}

// Show/hide screens
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 3000);
}

// Create room
function createRoom() {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        showError('Please enter your name');
        return;
    }
    
    gameState.playerName = playerName;
    socket.emit('createRoom', { playerName: playerName });
}

// Show join room section
function showJoinRoom() {
    document.getElementById('joinRoomSection').classList.remove('hidden');
}

// Hide join room section
function hideJoinRoom() {
    document.getElementById('joinRoomSection').classList.add('hidden');
    document.getElementById('roomCode').value = '';
}

// Join room
function joinRoom() {
    const playerName = document.getElementById('playerName').value.trim();
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();
    
    if (!playerName) {
        showError('Please enter your name');
        return;
    }
    
    if (!roomCode) {
        showError('Please enter room code');
        return;
    }
    
    gameState.playerName = playerName;
    socket.emit('joinRoom', { playerName: playerName, roomCode: roomCode });
}

// Start game
function startGame() {
    socket.emit('startGame', { roomCode: gameState.roomCode });
}

// Roll dice
function rollDice() {
    if (!gameState.isMyTurn) {
        showError("It's not your turn!");
        return;
    }
    
    document.getElementById('rolldice').disabled = true;
    socket.emit('rollDice', { roomCode: gameState.roomCode });
}

// Create game board
function createGameBoard() {
    const board = document.getElementById('gameBoard');
    const player2Board = document.getElementById('player2Board');
    
    let boxes = '';
    let boxes2 = '';
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const x = (9 - i) * 50;
            let y = j * 50;
            const n = i * 10 + j + 1;
            
            if (i % 2 === 1) {
                y = (9 - j) * 50;
            }
            
            const color = j % 2 === 0 ? '#d04c3e' : 'white';
            
            boxes += `<div class='box' id='box-${n}' style='margin-top:${x}px; margin-left: ${y}px; background:${color};'>${n}</div>`;
            boxes2 += `<div class='boxp2' id='boxp2-${n}' style='margin-top:${x}px; margin-left: ${y}px; background-color: transparent;'></div>`;
        }
    }
    
    boxes += `<div style="position: absolute;"><img src="asset/SnakesNladders-500.png" alt=""></div>`;
    
    board.innerHTML = boxes;
    player2Board.innerHTML = boxes2;
}

// Update player position on board
function updatePlayerPosition(playerIndex, position, oldPosition = null) {
    const isPlayer1 = playerIndex === 0;
    const playerImg = isPlayer1 ? 'asset/hulk 4848.png' : 'asset/super 4848.png';
    const playerAlt = isPlayer1 ? 'hulk' : 'super';
    const boxPrefix = isPlayer1 ? 'box-' : 'boxp2-';
    
    // Clear old position
    if (oldPosition && oldPosition !== position) {
        const oldBox = document.getElementById(boxPrefix + oldPosition);
        if (oldBox) {
            if (isPlayer1) {
                oldBox.innerHTML = oldPosition;
            } else {
                oldBox.innerHTML = '';
            }
        }
    }
    
    // Set new position
    const newBox = document.getElementById(boxPrefix + position);
    if (newBox) {
        newBox.innerHTML = `<img src="${playerImg}" alt="${playerAlt}">`;
    }
    
    // Update position display
    document.getElementById(`player${playerIndex + 1}Position`).textContent = `Position: ${position}`;
}

// Update turn display
function updateTurnDisplay(currentPlayerName, isMyTurn) {
    const turnDiv = document.getElementById('currentTurn');
    turnDiv.innerHTML = `<h2>${currentPlayerName}'s Turn</h2>`;
    
    if (isMyTurn) {
        turnDiv.innerHTML += '<p style="color: #4CAF50;">Your turn!</p>';
        document.getElementById('rolldice').disabled = false;
    } else {
        turnDiv.innerHTML += '<p style="color: #ff6b6b;">Wait for your turn</p>';
        document.getElementById('rolldice').disabled = true;
    }
}

// Back to menu
function backToMenu() {
    location.reload();
}

// Socket event listeners
socket.on('roomCreated', (data) => {
    gameState.roomCode = data.roomCode;
    gameState.playerId = data.playerId;
    gameState.playerIndex = data.playerIndex;
    
    document.getElementById('displayRoomCode').textContent = data.roomCode;
    showScreen('waitingRoom');
});

socket.on('roomJoined', (data) => {
    gameState.roomCode = data.roomCode;
    gameState.playerId = data.playerId;
    gameState.playerIndex = data.playerIndex;
    
    document.getElementById('displayRoomCode').textContent = data.roomCode;
    showScreen('waitingRoom');
});

socket.on('playerJoined', (data) => {
    gameState.players = data.players;
    
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';
    
    data.players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        playerDiv.innerHTML = `
            <span>${player.name}</span>
            <span class="player-role">${index === 0 ? 'Hulk 🧌' : 'Superman 🦸‍♂️'}</span>
        `;
        playersContainer.appendChild(playerDiv);
    });
    
    if (data.canStart) {
        document.getElementById('startGameBtn').classList.remove('hidden');
        document.getElementById('waitingMessage').classList.add('hidden');
    }
});

socket.on('gameStarted', (data) => {
    showScreen('gameScreen');
    createGameBoard();
    initAudio();
    
    // Set player names
    document.getElementById('player1Name').textContent = gameState.players[0].name + ' (Hulk)';
    document.getElementById('player2Name').textContent = gameState.players[1].name + ' (Superman)';
    
    // Initialize player positions
    updatePlayerPosition(0, 1);
    updatePlayerPosition(1, 1);
    
    gameState.isMyTurn = (gameState.playerIndex === data.playerIndex);
    updateTurnDisplay(data.currentPlayer, gameState.isMyTurn);
});

socket.on('diceRolled', (data) => {
    document.getElementById('dice-res').textContent = data.diceValue;
    
    // Play sound effects
    if (soundEffects.dice) soundEffects.dice.play();
    
    // Check for snake or ladder
    const snakesAndLadders = {
        17: 36, 33: 15, 48: 70, 55: 27, 56: 77, 62: 20, 73: 94, // Ladders
        79: 44, 96: 76 // Snakes
    };
    
    if (snakesAndLadders[data.newPosition]) {
        if (data.newPosition > data.oldPosition + data.diceValue) {
            // Ladder
            if (soundEffects.ladder) soundEffects.ladder.play();
        } else {
            // Snake
            if (soundEffects.snake) soundEffects.snake.play();
        }
    }
    
    // Update player position
    updatePlayerPosition(data.playerIndex, data.newPosition, data.oldPosition);
    
    // Update turn
    gameState.isMyTurn = (gameState.playerIndex === data.nextPlayerIndex);
    updateTurnDisplay(data.nextPlayer, gameState.isMyTurn);
    
    // Re-enable dice button after delay
    setTimeout(() => {
        document.getElementById('rolldice').disabled = false;
    }, 2000);
});

socket.on('gameEnded', (data) => {
    document.getElementById('winnerMessage').textContent = `🎉 ${data.winner} Wins! 🎉`;
    
    if (soundEffects.win) soundEffects.win.play();
    
    setTimeout(() => {
        showScreen('gameOverScreen');
    }, 3000);
});

socket.on('playerLeft', (data) => {
    showError('Other player left the game');
    setTimeout(() => {
        backToMenu();
    }, 2000);
});

socket.on('error', (data) => {
    showError(data.message);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    showScreen('mainMenu');
});