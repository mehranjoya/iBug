/*
##########################
## iBug - Find the Bug! ##
##########################
## Created by - M.Joya  ##
##########################

######## Game JS #########
*/


//Game state variable
var gameStarted;

//Sounds used in game
var click = new Audio('click.wav');
var zap = new Audio('zap.wav');


//Setting an array for all 16 bugs
var bugs = [];
for(var i = 1; i<=16; i++){
  bugs.push("bug" + i);
}

//Check if user is logged in to play the game
if(localStorage.loggedInUser !== undefined){

//Displaying each element of bug array
for(var i = 0; i<bugs.length; i++) {
  document.write("<div class='bug' onclick='clickedBug(\"" + bugs[i] + "\")' id='"+ bugs[i] +"'></div>");
}

//Select a random bug to be the selected/red bug
var redBug = bugs[Math.floor(Math.random()*bugs.length)];
//document.write("<br><br><div id='redBug "+ redBug +"' style='color: red; float: left;'>" + "redBug: " + redBug + "</div>");


//Function to start the game and allow player to click on bugs
function start() {
  if(gameStarted !== false){
    //Start the timer
    watch.start();
    gameStarted = true;
  }}
}else{
  document.getElementById("gameMessage").innerHTML = "Please <a href='?p=login'>Log in</a> or <a href='?p=register'>Register</a> to play!";

  document.getElementById('info').style.display = "none";

  var hideTimer = true;

}


//Checking which bug has been clicked
function clickedBug(bugId){
  if(gameStarted == true){
  var bug = document.getElementById(bugId);

  if(bug.id == redBug){
    //Add the redBug class to change the color/img of the red bug
    bug.className += " redBug";

    //Timer stop function
    function stop() {
      //Set timer text to game over
      toggleBtn.textContent = 'Game Over';

      //Stop the watch
      watch.stop();
      zap.play();
      console.log(timer.textContent);

      var user = JSON.parse(localStorage[localStorage.loggedInUser]);
      var gameScore = timer.textContent;


      //Check if user has a score and if its greater than game score replace it
      if(user.score > gameScore){
        user.score = gameScore;
        localStorage[localStorage.loggedInUser] = JSON.stringify(user);

      //If user hasnt got a score store the current score
      }else if (user.score == ""){
        user.score = gameScore;
        localStorage[localStorage.loggedInUser] = JSON.stringify(user);
      }

      //Set the game start mode to false
      gameStarted = false;

      document.getElementById('reset').style.display = "block";

    }

    //Run the stop function
    stop();
    gameStarted = false;
   //Game ends and score gets recorded

  }else{
    //Add the blueBug class to change the color/img of the bug
    bug.className += " blueBug";
    click.play();

  }

}

}
