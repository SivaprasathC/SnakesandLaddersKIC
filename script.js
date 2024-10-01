function createBoxes() {
    var boxes="";
    for (let i = 0; i < 10; i++) 
    {
             for (let j = 0; j < 10; j++) 
             {    y=i*50;
                  x=j*50;
                  if((i+j)%2==0)
                  {
                     bg="red";
                  }
                 else{
                      bg="white";
                }
                  boxes+=` <div class='box' style='margin:${y}px ${x}px ; background:${bg};'></div>`;
             }
    }
    document.querySelector(".board").innerHTML=boxes;
}
createBoxes();

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
