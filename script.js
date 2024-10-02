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
coin=document.querySelectorAll(".box")
coin[1].innerHTML= '<img src="asset/squid circle.png" alt="smurf">'

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
