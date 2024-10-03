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
    document.querySelector(".board").innerHTML=boxes;
}
grids();

//==================================================================================================================================

coin=document.querySelectorAll(".box")
var start=1
currentstep=0
function rolldice(){ 
        var rollmp3 = new Audio("asset/dice-roll-sound.mp3");
        rollmp3.play();
        x=1;
        animate=setInterval(()=>{
          newstep=Math.floor(Math.random() * 6) + 1;
          document.getElementById("dice-res").innerHTML=newstep
        if(x>10)
          {
           clearInterval(animate);
           currentstep=currentstep+newstep
            move(currentstep)
          }
           x++; I
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
    setInterval(play,1000)
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
