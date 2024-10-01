function createBoxes() {
    var boxes="";
    for (let i = 0; i < 10; i++) 
    {
             for (let j = 0; j < 10; j++) 
             {    y=(9-i)*50;
                  x=j*50;
                  if((i+j)%2==0)
                  {
                     bg="red";
                  }
                 else{
                      bg="white";
                }
                if(i%2==0){
                    n=i*10+j+1;
                }
                    else{
                    n=i*10+(10-j);
                }
                  boxes+=` <div class='box' style='margin:${y}px ${x}px ; background:${bg};'>${n}</div>`;
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
