let hasGameStarted = false;
let level = 0;
let buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern =[];
let userClickPattern = [];

$(document).on("keydown",function() {
    if (hasGameStarted===false) {      
      $("h1").text("Level " + level);
      nextSequence();
      hasGameStarted = true;
    }
  });

let nextSequence = () => {      
    level++;   
    $("h1").text("Level " + level);       
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).addClass("pressed") 
    setTimeout(()=>{$("#"+randomChosenColour).removeClass("pressed")},100);
    playAudio(randomChosenColour);    
  }

let playAudio = (colour) =>{
    let audio = new Audio("sounds/"+colour+".mp3")
    audio.play();
}

$(".button").on("click", function() {
    let userClickColour = $(this).attr("id");
    $("#"+userClickColour).addClass("pressed");
    setTimeout(()=>{$("#"+userClickColour).removeClass("pressed")},100);
    userClickPattern.push(userClickColour);  
    checkAnswer(userClickPattern.length-1);
  });

let checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
        setTimeout(function () {nextSequence();}, 1000);
      }else {
      playAudio("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

let startOver = () => {
    level = 0;
    userClickPattern =[];
    gamePattern = [];
    hasGameStarted = false;    
  }






