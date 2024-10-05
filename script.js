function grids() {
    var boxes="";
    for (let i = 0; i < 10; i++) 
    {
             for (let j = 0; j < 10; j++) 
             {    x=(9-i)*50;
                  y=j*50;
                  if(j%2==0){
                    col="#d04c3e"
                  }
                  else{
                    col="white"
                  }
                  n=i*10+j+1
                  if(i%2==1){
                    y=(9-j)*50
                  }
                  boxes+=` <div class='box' style='margin-top:${x}px; margin-left: ${y}px ; background:${col};'>${n}</div>`;
             }
    }     
        boxes+=`<div style=" position: absolute;">
            <img src="asset/SnakesNladders-500.png" alt="">
        </div>`
    document.querySelector(".board").innerHTML=boxes;
}
grids();

//=========================================================================================================================
function myaudio(){
  const state=document.getElementById("audiobg").innerText;
  console.log(state)
  const play="Play Sound"
  const mute="Mute"
  if (state==play)
  {
  const audio = document.querySelector("audio");
  audio.volume = 1;
  audio.play();
  document.getElementById("audiobg").innerText="Mute";
  }
  if (state==mute)
  {
      const audio = document.querySelector("audio");
      audio.pause();
      audio.currentTime = 0;
      document.getElementById("audiobg").innerText="Play Sound";
  }
};
var toggle=Math.floor(Math.random() * 6) + 1
function decide(){
     if((toggle%2)==0){
      toggle=toggle+1
      document.getElementById("roll-status").innerHTML=" <h1>supermans's Turn</h1>"
      player1()
     }
     else{
      toggle=toggle+1
      document.getElementById("roll-status").innerHTML=" <h1>Hulk's Turn</h1>"
      player2()

     }
}
//=================================================================================================
var start=1
var currentstep=0
function player1(){
  rolldice()
var coin=document.querySelectorAll(".box") 

function rolldice()
{        
          document.getElementById("rolldice").disabled = true;
          setTimeout(function() {
          document.getElementById("rolldice").disabled = false;
         }, 2000);
        var snakeahh= new Audio("asset/snake_ahh.wav");
        var ladderhur=new Audio("asset/ladderhur.wav");
        var rollmp3 = new Audio("asset/dice-roll-sound.mp3");
        var winsound=new Audio("asset/winsound.wav");
        rollmp3.play();
        x=1;
        animate=setInterval(()=>{
          newstep=Math.floor(Math.random() * 6) + 1;
          document.getElementById("dice-res").innerHTML=newstep 
        if(x>10)
        {
           clearInterval(animate);
           if(currentstep==95 && (newstep==6))
            {
            newstep=0
            document.getElementById("dice-res").innerHTML="No Move"
            }
           else if(currentstep==96 && (newstep==5||newstep==6))
            {
              newstep=0
              document.getElementById("dice-res").innerHTML="No Move"
            }
           else if(currentstep==97 && (newstep==4||newstep==5||newstep==6))
              {
                newstep=0
               document.getElementById("dice-res").innerHTML="No Move"
             }
           else if(currentstep==98 &&(newstep==3||newstep==4||newstep==5||newstep==6))
              {
                    newstep=0
                    document.getElementById("dice-res").innerHTML="No Move"
              }
           else if(currentstep==99 &&(newstep==2||newstep==3||newstep==4||newstep==5||newstep==6))
            {
                    newstep=0
                    document.getElementById("dice-res").innerHTML="No Move"
            }
// console.log((currentstep==98) && (newstep==3||newstep==4||newstep==5||newstep==6))
           beforestate=currentstep
           currentstep=currentstep+newstep
          //  console.log(currentstep)
           if(currentstep==100){
          
                  document.getElementById("dice-res").innerHTML="HULK WON"
                  move(currentstep)
                  winsound.play();
                  setTimeout(function() { location.reload(1); }, 5000);
           }
           else if(currentstep==17 )
            {  //snake or ladder box actual
                   
                  coin[35].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">'  //resultbox index(box -1)
                  coin[16-newstep].innerHTML=`${17-newstep} ` //replacd old box index with prev number(actual box number)
                  currentstep=36   //setting new pos
                  start=36
                  ladderhur.play();
           }

           else if(currentstep==33 )
            {  
        
            coin[14].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">'  
            coin[32-newstep].innerHTML=`${33-newstep} `
            currentstep=15 
            start=15
            snakeahh.play();
           }

           else if(currentstep==48 )
            {  
           
                  coin[69].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">' 
                  coin[47-newstep].innerHTML=`${48-newstep} ` 
                  currentstep=70  
                  start=70
                  ladderhur.play();
             }
           else if(currentstep==79)
              {  
           
                 coin[43].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">' 
                 coin[78-newstep].innerHTML=`${79-newstep} `
                 currentstep=44
                 start=44
                 snakeahh.play();
              }

           else if(currentstep==55 ){
            
                  coin[26].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">' 
                  coin[54-newstep].innerHTML=`${55-newstep} `
                  currentstep=27
                  start=27
                  snakeahh.play();
              }

           else if(currentstep==56){  
            
                  coin[76].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">' 
                  coin[55-newstep].innerHTML=`${56-newstep} `
                  currentstep=77 
                  start=77
                  ladderhur.play();
               }

          else if(currentstep==62 ){   
        
                  coin[19].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">' 
                  coin[61-newstep].innerHTML=`${62-newstep} `
                  currentstep=20   
                  start=20
                  snakeahh.play();
                }

          else if(currentstep==73 ){  
            
                   coin[93].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">'  
                   coin[72-newstep].innerHTML=`${73-newstep} `  
                   currentstep=94  
                    start=94
                   ladderhur.play();
              }

          else if(currentstep==96 ){ 
        
                  coin[75].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">'   
                 coin[95-newstep].innerHTML=`${96-newstep} `
                  currentstep=76
                  start=76  
                  snakeahh.play();
                }
          
              
                    move(currentstep)
             
        }
           x++;   
        },100);
        // newstep=Math.floor(Math.random() * 6) + 1;
        // document.getElementById("dice-res").innerHTML=newstep     
}

 
function move(step)
{    console.log("start",start)
     console.log("stop",step)
    stop=step
    function play()
    {
    if(start!=1)
    {
    coin[start-2].innerHTML=`${start-1}`;
    }
    coin[start-1].innerHTML= '<img src="asset/hulk 4848.png" alt="hulk">'
    if(start<stop)
    {
    start++;
    }
    }
    setInterval(play,200)
}

}
// coin[1].innerHTML= '<img src="asset/hulk 4848.png" alt="smurf">'
//=====================================================================================================================
  //===================================================================================================================
  //===================================================================================================================
  //===================================================================================================================
  // FOR PLAYER 2======================================================================================================

function gridsp2() {
    var boxesp2="";
    for (let i = 0; i < 10; i++) 
    {
             for (let j = 0; j < 10; j++) 
             {    x=(9-i)*50;
                  y=j*50;
                  if(i%2==1){
                    y=(9-j)*50
                  }
                  boxesp2+=` <div class='boxp2' style='margin-top:${x}px; margin-left: ${y}px ;background-color: transparent;'></div>`;
             }
    }     
    document.querySelector(".boardp2").innerHTML=boxesp2;
}
gridsp2()

//================================================================================
var coin2=document.querySelectorAll(".boxp2") 
var start2=1
var currentstep2=0
function player2() {
rolldice2()

function rolldice2()
{        
          document.getElementById("rolldice").disabled = true;
          setTimeout(function() {
          document.getElementById("rolldice").disabled = false;
         }, 2000);
        var snakeahh2= new Audio("asset/snake_ahh.wav");
        var ladderhur2=new Audio("asset/ladderhur.wav");
        var rollmp32 = new Audio("asset/dice-roll-sound.mp3");
        var winsound2=new Audio("asset/winsound.wav");
        rollmp32.play();
        x2=1;
        animate2=setInterval(()=>{
          newstep2=Math.floor(Math.random() * 6) + 1;
          document.getElementById("dice-res").innerHTML=newstep2 
        if(x2>10)
        {
           clearInterval(animate2);
           if(currentstep2==95 && (newstep2==6))
            {
            newstep2=0
            document.getElementById("dice-res").innerHTML="No Move"
            }
           else if(currentstep2==96 && (newstep2==5||newstep2==6))
            {
              newstep2=0
              document.getElementById("dice-res").innerHTML="No Move"
            }
           else if(currentstep2==97 && (newstep2==4||newstep2==5||newstep2==6))
              {
                newstep2=0
               document.getElementById("dice-res").innerHTML="No Move"
             }
           else if(currentstep2==98 &&(newstep2==3||newstep2==4||newstep2==5||newstep2==6))
              {
                    newstep2=0
                    document.getElementById("dice-res").innerHTML="No Move"
              }
           else if(currentstep2==99 &&(newstep2==2||newstep2==3||newstep2==4||newstep2==5||newstep2==6))
            {
                    newstep2=0
                    document.getElementById("dice-res").innerHTML="No Move"
            }
// console.log((currentstep2==98) && (newstep2==3||newstep2==4||newstep2==5||newstep2==6))
           currentstep2=currentstep2+newstep2
          //  console.log(currentstep2)
           if(currentstep2==100){
          
                  document.getElementById("dice-res").innerHTML="S-Man Won"
                  move2(currentstep2)
                  winsound2.play();
                  setTimeout(function() { location.reload(1); }, 5000);
           }
           else if(currentstep2==17 )
            {  //snake or ladder box actual
                   
                  coin2[35].innerHTML= '<img src="asset/super 4848.png" alt="super">'  //resultbox index(box -1)
                  coin2[16-newstep2].innerHTML=""
                  currentstep2=36   //setting new pos
                  start2=36
                  ladderhur2.play();
           }

           else if(currentstep2==33 )
            {  
        
            coin2[14].innerHTML= '<img src="asset/super 4848.png" alt="super">'  
            coin2[32-newstep2].innerHTML=""
            currentstep2=15 
            start2=15
            snakeahh2.play();
           }

           else if(currentstep2==48 )
            {  
           
                  coin2[69].innerHTML= '<img src="asset/super 4848.png" alt="super">' 
                  coin2[47-newstep2].innerHTML=""
                  currentstep2=70  
                  start2=70
                  ladderhur2.play();
             }
           else if(currentstep2==79)
              {  
           
                 coin2[43].innerHTML= '<img src="asset/super 4848.png" alt="super">' 
                 coin2[78-newstep2].innerHTML=""
                 currentstep2=44
                 start2=44
                 snakeahh2.play();
              }

           else if(currentstep2==55 ){
            
                  coin2[26].innerHTML= '<img src="asset/super 4848.png" alt="super">' 
                  coin2[54-newstep2].innerHTML=""
                  currentstep2=27
                  start2=27
                  snakeahh2.play();
              }

           else if(currentstep2==56){  
            
                  coin2[76].innerHTML= '<img src="asset/super 4848.png" alt="super">' 
                  coin2[55-newstep2].innerHTML=""
                  currentstep2=77 
                  start2=77
                  ladderhur2.play();
               }

          else if(currentstep2==62 ){   
        
                  coin2[19].innerHTML= '<img src="asset/super 4848.png" alt="super">' 
                  coin2[61-newstep2].innerHTML=""
                  currentstep2=20   
                  start2=20
                  snakeahh2.play();
                }

          else if(currentstep2==73 ){  
            
                   coin2[93].innerHTML= '<img src="asset/super 4848.png" alt="super">' 
                   coin2[72-newstep2].innerHTML="" 
                   currentstep2=94  
                    start2=94
                   ladderhur2.play();
              }

          else if(currentstep2==96 ){ 
        
                  coin2[75].innerHTML= '<img src="asset/super 4848.png" alt="super">'   
                  coin2[95-newstep2].innerHTML=""
                  currentstep2=76
                  start2=76  
                  snakeahh2.play();
                }
          
              
                    move2(currentstep2)
             
        }
           x2++;   
        },100);
        // newstep2=Math.floor(Math.random() * 6) + 1;
        // document.getElementById("dice-res").innerHTML=newstep2     
}

 
function move2(step2)
{  
    stop2=step2
    function play2()
    {
    if(start2!=1)
    {
    coin2[start2-2].innerHTML="";
    }
    coin2[start2-1].innerHTML= '<img src="asset/super 4848.png" alt="super">'
    if(start2<stop2)
    {
    start2++;
    }
    }
    setInterval(play2,200)
}
  
}
