/*
##########################
## iBug - Find the Bug! ##
##########################
## Created by - M.Joya  ##
##########################

######## Timer JS #########
*/

var timer = document.getElementById('timer');
var timerBlock = document.getElementById('timerBlock');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');

//Create new timer object
var watch = new Timer(timer);

if(hideTimer){
  timerBlock.style.display = "none";
}

toggleBtn.addEventListener('click', function() {
  watch.isOn ? stop() : start();
});

//Stopwatch function
function Timer(elem) {
  var time = 0;
  var offset;
  var interval;


  //Fucntion that updates the timer
  function update() {
    if (this.isOn) {
      time += delta();
    }

    elem.textContent = timeFormatter(time);
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;

    offset = now;

    return timePassed;
  }

  //Format the timer to seconds and milliseconds
  function timeFormatter(time) {
    time = new Date(time);

    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();


    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = '0' + milliseconds;
    }

    return seconds + ' . ' + milliseconds;
  }

  //Start the timer
  this.start = function() {
    interval = setInterval(update.bind(this), 10);
    offset = Date.now();
    this.isOn = true;
  };

  //Stop the timer
  this.stop = function() {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
  };


  this.isOn = false;
}
