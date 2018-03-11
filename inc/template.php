<?php
//Header output
function siteHeader(){

  //Check if request for page is made else title is home.
  if(isset($_REQUEST['p'])){
    $title = $_REQUEST['p'];
  }else{
    $title = 'Find the bug!';
  }

  //Echo header elements
  echo '<html>';
  echo '<head>';
  echo '<meta charset="UTF-8">';
  echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  echo '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
  echo '<link rel="icon" type="image/gif" href="img/favicon.gif"/>';

  //Link css stylesheets.
  echo '<link rel="stylesheet" href="css/style.css">';
  echo '<link rel="stylesheet" href="css/game.css">';
  echo '<link rel="stylesheet" href="css/responsive.css">';

  //Output site title passing $title variable according to currentpage.
  echo '<title>iBug - ' . strtoupper($title) . '</title>';
  echo '</head>';
  echo '<body onload="checkLogin()" style="background: url(img/bg.gif) no-repeat; background-size: cover;">';
  echo '<section id="header">';
  echo '<a href="?p=home"><div class="logo"><img src="img/logo.png" alt=""></div></a>';
  echo '</section>';
}

//Navigation output
function siteNavigation(){

  //Echo navigation bar elements/navigation section starts.
  echo '<section id="nav">';

  //Check if request for page is made else current page is Home.
  if(isset($_REQUEST['p'])){
    $currentPage = $_REQUEST['p'];
  }else{
    $currentPage = 'home';
  }

  //Store pages of site in $pages array and links of each page in $pageLink array.
  $pages = array("home", "about", "play", "scoreboard", "login");
  $pageLink = array("?p=home", "?p=about","?p=play", "?p=scoreboard", "?p=login");

  //Check to see if registration page is active and change nav login text to 'register'.
  if($currentPage == 'register'){
    $pages['4'] = 'register';
  }

  //Loop through values in pages array, assigning pageLink to page.
  for ($i=0; $i < 5 ; $i++) {
    echo '<a ';

    //Check is current page is equal to $i and assign class 'active'.
    if($pages[$i] == $currentPage){
      echo 'class="active"';
    }

    echo 'href="' . $pageLink[$i] . '" id="' . $pages[$i] .'">' . $pages[$i] . '</a>';
  }
  echo '</section>';
  //Navigation section ends
}

//Content Output
function siteContent(){

  //Site content section starts
  echo '<section id="content">';
  echo '<div class="content">';

  //Set page variable to the current page request.
  $page = $_REQUEST['p'];

  //Switch case function to identify which page request is made and include the relevant page to output.
  switch ($page) {
    case 'home':
      include('pages/home.html');
      break;

    case 'about':
      include('pages/about.html');
      break;

    case 'play':
      include('pages/play.html');
      break;

    case 'scoreboard':
      include('pages/scoreboard.html');
      break;

    case 'login':
      include('pages/login.html');
      break;

    case 'register':
      include('pages/register.html');
      break;

    default:
      include('pages/home.html');
      break;
  }
  echo '</div>';
  echo '</section>';
  //Site content ends
}

//Footer output
function siteFooter() {
  //Echo footer elements
  echo '<section id="footer">';
  echo '<p>&copy 2017 - M. Joya</p>';
  echo '</section>';

  echo '</body>';

  //Indlude the main javascript file
  echo '<script type="text/javascript" src="js/main.js"></script>';

  echo '</html>';
  //Footer ends
}
?>
