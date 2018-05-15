// Listing Variables First
var songArray =       // Song Array    
    ["ALIVE", "COURDORY", "BLACK", "BETTERMAN"];
const lives = 10;            // # of Guesses 
var guessedLets = [];  // # of letters guessed
var currentSongIndex;    // current song index 
var guessingSong = [];       // guessing the song to the actual song
var guessesRemaining = 0;     // guesses left
var isDone = false;    // to start over    
var wins = 0;      // # of wins            

// sounds 
var winSound = new Audio('./assets/sounds/win.wav');  //**need to find a Win sound
var loseSound = new Audio('./assets/sounds/lose.mp3');

// Game reset
function resetGame() {
    guessesRemaining = lives;
    currentSongIndex = Math.floor(Math.random() * (songArray.length)); // Pick a random song from arrau
    // reset temporary arrays
    guessedLets = [];
    guessingSong = [];
    document.getElementById("stickmanImage").src = ""; // reset stickman image
    // pick random word and clear it
    for (var i = 0; i < songArray[currentSongIndex].length; i++) {
        guessingSong.push("_");
    }   
    // Show / Hide the win / loss / reset image & text
    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("lose-image").style.cssText = "display: none";
    document.getElementById("win-image").style.cssText = "display: none"; 
    updateDisplay(); // update display 
};

//  Updates the content on html doc
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins + " Wins";
    // Show the guessed letters
    var guessingSongText = "";
    for (var i = 0; i < guessingSong.length; i++) {
        guessingSongText += guessingSong[i];
    }
    // updates guesses
    document.getElementById("currentWord").innerText = guessingSongText;
    document.getElementById("guessesRemaining").innerText = "Guesses Till Death: " + guessesRemaining;
    document.getElementById("guessedLets").innerText = "Letters Used: " + guessedLets;
};

// the hanging process - image updating in response to guesses
function updatestickmanImage() {
    document.getElementById("stickmanImage").src = "assets/images/" + (lives - guessesRemaining) + ".png";
};

// Find the guesses in the string from array
function evaluateGuess(letter) {
    var positions = [];
    // This is the loop to find and store the guessed letters
    for (var i = 0; i < songArray[currentSongIndex].length; i++) {
        if(songArray[currentSongIndex][i] === letter) {
            positions.push(i);
        }
    }
    // loop to check if letter is in string or not
    if (positions.length <= 0) {
        guessesRemaining--;
        updatestickmanImage();
    } else {
        // loop to replace _ with guessed letter
        for(var i = 0; i < positions.length; i++) {
            guessingSong[positions[i]] = letter;
        }
    }
};

// see if there's a win by checking if there are any more _'s
function checkWin() {
    if(guessingSong.indexOf("_") === -1) {
        document.getElementById("win-image").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText= "display: block";
        wins++;
        winSound.play();
        isDone = true;
    }
};

// see if there's a loss 
function checkLoss()
{
    if(guessesRemaining <= 0) {
        loseSound.play();
        document.getElementById("lose-image").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display:block";
        isDone = true;
    }
}

// guessing letters & allowing for duplicate letter guesses
function makeGuess(letter) {
    if (guessesRemaining > 0) {
        if (guessedLets.indexOf(letter) === -1) {
            guessedLets.push(letter);
            evaluateGuess(letter);
        }
    }
    
};

// waiting for the end of the game, reset with letter press (key)
document.onkeydown = function(event) {
    if(isDone) {
        resetGame();
        isDone = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};