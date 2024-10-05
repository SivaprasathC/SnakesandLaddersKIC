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

var coin=document.querySelectorAll(".box") 
var start=1
var currentstep=0
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
          
                  document.getElementById("dice-res").innerHTML="Won"
                  move(currentstep)
                  winsound.play();
                  setTimeout(function() { location.reload(1); }, 5000);
           }
           else if(currentstep==17 )
            {  //snake or ladder box actual
                   
                  coin[35].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">'  //resultbox index(box -1)
                  coin[16-newstep].innerHTML=`${17-newstep} ` //replacd old box index with prev number(actual box number)
                  currentstep=36   //setting new pos
                  start=36
                  ladderhur.play();
           }

           else if(currentstep==33 )
            {  
        
            coin[14].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">'  
            coin[32-newstep].innerHTML=`${33-newstep} `
            currentstep=15 
            start=15
            snakeahh.play();
           }

           else if(currentstep==48 )
            {  
           
                  coin[69].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">' 
                  coin[47-newstep].innerHTML=`${48-newstep} ` 
                  currentstep=70  
                  start=70
                  ladderhur.play();
             }
           else if(currentstep==79)
              {  
           
                 coin[43].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">' 
                 coin[78-newstep].innerHTML=`${79-newstep} `
                 currentstep=44
                 start=44
                 snakeahh.play();
              }

           else if(currentstep==55 ){
            
                  coin[26].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">' 
                  coin[54-newstep].innerHTML=`${55-newstep} `
                  currentstep=27
                  start=27
                  snakeahh.play();
              }

           else if(currentstep==56){  
            
                  coin[76].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">' 
                  coin[55-newstep].innerHTML=`${56-newstep} `
                  currentstep=77 
                  start=77
                  ladderhur.play();
               }

          else if(currentstep==62 ){   
        
                  coin[19].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">' 
                  coin[61-newstep].innerHTML=`${62-newstep} `
                  currentstep=20   
                  start=20
                  snakeahh.play();
                }

          else if(currentstep==73 ){  
            
                   coin[93].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">'  
                   coin[72-newstep].innerHTML=`${73-newstep} `  
                   currentstep=94  
                    start=94
                   ladderhur.play();
              }

          else if(currentstep==96 ){ 
        
                  coin[75].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">'   
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
    coin[start-1].innerHTML= '<img src="asset/hulk 4848.png" alt="squid">'
    if(start<stop)
    {
    start++;
    }
    }
    setInterval(play,200)
}
// coin[1].innerHTML= '<img src="asset/hulk 4848.png" alt="smurf">'
//============================================================================================================================================


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
  //===================================================================================================================
