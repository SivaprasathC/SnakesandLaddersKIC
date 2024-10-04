function grids() {
    var boxes="";
    for (let i = 0; i < 10; i++) 
    {
             for (let j = 0; j < 10; j++) 
             {    x=(9-i)*50;
                  y=j*50;
                  if(j%2==0){
                    col="red"
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

coin=document.querySelectorAll(".box") 
var start=1
currentstep=0
function rolldice(){ 
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
           if(currentstep==95 && (newstep==6)){
            newstep=0
            document.getElementById("dice-res").innerHTML="No Move"
        }
        if(currentstep==96 && (newstep==5||newstep==6)){
          newstep=0
          document.getElementById("dice-res").innerHTML="No Move"
      }
      if(currentstep==97 && (newstep==4||newstep==5||newstep==6)){
        newstep=0
        document.getElementById("dice-res").innerHTML="No Move"
    }
    if(currentstep==98 &&(newstep==3||newstep==4||newstep==5||newstep==6)){
      newstep=0
      document.getElementById("dice-res").innerHTML="No Move"
  }
  if(currentstep==99 &&(newstep==2||newstep==3||newstep==4||newstep==5||newstep==6)){
    newstep=0
    document.getElementById("dice-res").innerHTML="No Move"
}
// console.log((currentstep==98) && (newstep==3||newstep==4||newstep==5||newstep==6))
           beforestate=currentstep
           currentstep=currentstep+newstep
          //  console.log(currentstep)
           if(currentstep==100){
          
                  document.getElementById("dice-res").innerHTML="Won"
                  winsound.play();
                  setTimeout(function() { location.reload(1); }, 5000);
           }
          else if(currentstep==17 ){  //snake or ladder box actual
                   
                  coin[35].innerHTML= '<img src="asset/squid circle.png" alt="squid">'  //resultbox index(box -1)
                  coin[beforestate-1].innerHTML=`${beforestate} `  //replacd old box index with prev number(actual box number)
                  currentstep=36   //setting new pos
                  ladderhur.play();
           }

           else if(currentstep==33 ){  
        
            coin[14].innerHTML= '<img src="asset/squid circle.png" alt="squid">'  
            coin[beforestate-1].innerHTML=`${beforestate} ` 
            currentstep=15 
            snakeahh.play();
           }

           else if(currentstep==48 ){  
           
                  coin[69].innerHTML= '<img src="asset/squid circle.png" alt="squid">' 
                  coin[beforestate-1].innerHTML=`${beforestate} ` 
                  currentstep=70  
                  ladderhur.play();
             }
             else if(currentstep==79){  
           
                 coin[43].innerHTML= '<img src="asset/squid circle.png" alt="squid">' 
                 coin[beforestate-1].innerHTML=`${beforestate} ` 
                 currentstep=44
                 snakeahh.play();
              }

              else if(currentstep==55 ){
            
                  coin[26].innerHTML= '<img src="asset/squid circle.png" alt="squid">' 
                  coin[beforestate-1].innerHTML=`${beforestate} ` 
                  currentstep=27
                  snakeahh.play();
              }

              else if(currentstep==56){  
            
                  coin[76].innerHTML= '<img src="asset/squid circle.png" alt="squid">' 
                  coin[beforestate-1].innerHTML=`${beforestate} ` 
                  currentstep=77 
                  ladderhur.play();
               }

               else if(currentstep==62 ){   
        
                  coin[19].innerHTML= '<img src="asset/squid circle.png" alt="squid">' 
                  coin[beforestate-1].innerHTML=`${beforestate} ` 
                  currentstep=20   
                  snakeahh.play();
                }

                else if(currentstep==73 ){  
            
                   coin[93].innerHTML= '<img src="asset/squid circle.png" alt="squid">'  
                   coin[beforestate-1].innerHTML=`${beforestate} `  
                   currentstep=94  
                   ladderhur.play();
              }

              else if(currentstep==96 ){ 
        
                  coin[75].innerHTML= '<img src="asset/squid circle.png" alt="squid">'   
                  coin[beforestate-1].innerHTML=`${beforestate} ` 
                  currentstep=76  
                  snakeahh.play();
                    }
           else{
            move(currentstep)
           }
           
          }
           x++;   
        },100);
        // newstep=Math.floor(Math.random() * 6) + 1;
        // document.getElementById("dice-res").innerHTML=newstep     
}

 
function move(step){
    stop=step
    function play()
    {
    if(start!=1)
    {
    coin[start-2].innerHTML=`${start-1}`;
    }
    coin[start-1].innerHTML= '<img src="asset/squid circle.png" alt="squid">'
    if(start<stop){
    start++;
    }
    }
    setInterval(play,200)
}
// coin[1].innerHTML= '<img src="asset/squid circle.png" alt="smurf">'
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
