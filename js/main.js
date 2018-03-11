/*
##########################
## iBug - Find the Bug! ##
##########################
## Created by - M.Joya  ##
##########################

######## Main JS #########
*/

//Creating a shorthand for getElementById
var $ = function(id) {return document.getElementById(id);};

//Check if user is already logged in
function checkLogin(){
  if(localStorage.loggedInUser !== undefined){
    $('login').innerHTML = "Logout";
    $('login').onclick = function(){
      localStorage.removeItem('loggedInUser');
      $('login').innerHTML = "Login";
    };

    //Log the user in, storing their username in localStorage
    var user = JSON.parse(localStorage[localStorage.loggedInUser]);
    $('loginSection').innerHTML = "You are currently logged in as <font color='blue'>" + user.username + "</font>";
  }

}

//Fucntion to log user in
function loginUser(){
  //Retrive username
  var username = $('username').value;

  //Check if the user exists
  if(localStorage[username] === undefined){
    $('message').innerHTML = "Username not recognized. Need to Register?";
    return;
  }else{
    var user = JSON.parse(localStorage[username]);
    var password = $('password').value;
    //Check if password matches local storage data
    if(password === user.password){
      //Store username to local storage
      localStorage.loggedInUser = user.username;

      $('message').innerHTML = "Login successful.";

      //Refresh the page
      setTimeout("location.href = '?p=login';",1000);

    }else{
      $('message').innerHTML = "Your username and password combination was incorrect.";
    }
  }
}

//Function to register user data in local storage
function registerUser(){
  //Create the object for user being registered
  var user = {};
  user.name = $('name').value;
  user.username = $('username').value;
  user.email = $('email').value;
  user.sID = $('sID').value;
  user.password = $('password').value;
  user.score = "";

  var rePassword = $('rePassword').value;

  //Checking user information
  var usrExists;
  var emailExists;
  var passMatch;

  if(localStorage.length == 0){
    //Add user to local storage
    localStorage[user.username] = JSON.stringify(user);

    //Show message of result to user
    $('message').innerHTML = "Registration complete.";
  }

  //Check the user fields arent empty
  if(user.username != ""){

    //Checking if the username exists in local storage
    for( var i = 0, len = localStorage.length; i < len; ++i){
      if(user.username === localStorage.key(i)){
        usrExists = true;
        break;
      }else{
        usrExists = false;
      }
    }

    //Looping through the local storage
    for( var i = 0, len = localStorage.length; i < len; ++i){

     var storedUser = JSON.parse(localStorage[localStorage.key(i)]);

      //Checking is the email matches email in local storage
      if(user.email === storedUser.email){
        emailExists = true;
        break;
      }else{
        emailExists = false;
      }
    }

    //If the user does no exist then add user else display message
    if(usrExists === false){

      if(emailExists === false){

        if(user.password !== "" && user.password === rePassword){
        //Add user to local storage
        localStorage[user.username] = JSON.stringify(user);

        //Show message of result to user
        $('message').innerHTML = "Registration complete.";

        //Redirect to the login page after certain time
        setTimeout("location.href = '?p=login';",1500);
      }else{
        //Show message of result to user
        $('message').innerHTML = "Passwords do not match.";
        $('password').style.border = "2px solid red";
        $('rePassword').style.border = "2px solid red";
      }
    }else{
      //Show message of result to user
      $('message').innerHTML = "Email already in use.";
      $('email').style.border = "2px solid red";
    }
    }else{
      //Show message of result to user
      $('message').innerHTML = "User already exists.";
      $('username').style.border = "2px solid red";
    }

}else{
  $('message').innerHTML = "Username cannot be empty.";
}

}
