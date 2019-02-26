var noiseOn = false;
var firstNoise = true;

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();

var temp;

// var element = document.querySelector(".noise-button");
// document.addEventListener("click", function() {
//   toggleOsc();
// });


function toggleOsc(){
  temp = event.currentTarget;
  temp.style.backgroundColor = "#"+((1<<24)*Math.random()|0).toString(16);
  if(firstNoise == true){
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    firstNoise = false;
    noiseOn = true;
  }
  else{
    if(noiseOn == false){
      oscillator.connect(audioCtx.destination);
      noiseOn = true;
    }
    else{
      oscillator.disconnect();
      noiseOn = false;
    }
  }
}
