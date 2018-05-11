// Song Array
var songArray =           
    ["ALIVE", "COURDORY", "BLACK", "BETTERMAN"];

// # of Guesses    
const lives = 10;            

// # of letters guessed
var guessedLets = [];  

// current song index
var currentSongIndex;     

// guessing the song to the actual song
var guessingSong = [];       

// guesses left
var guessesRemaining = 0;     

// to start over
var isDone = false;        

// # of wins
var wins = 0;                  

// sounds **need to find a Win sound

var winSound = new Audio('./assets/sounds/you-win.wav');
var loseSound = new Audio('./assets/sounds/lose.mp3');

// Game reset
function resetGame() {
    guessesRemaining = lives;

    // Pick a random song from arrau
    currentSongIndex = Math.floor(Math.random() * (songArray.length));

    // reset temporary arrays
    guessedLets = [];
    guessingSong = [];

    // reset hangman image
    document.getElementById("hangmanImage").src = "";

    // pick random word and clear it
    for (var i = 0; i < songArray[currentSongIndex].length; i++) {
        guessingSong.push("_");
    }   

    // Show / Hide the win / loss / reset image & text
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // update display 
    updateDisplay();
};

//  Updates the html 
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins + " Wins";

    // Show the guessed letters
    var guessingSongText = "";
    for (var i = 0; i < guessingSong.length; i++) {
        guessingSongText += guessingSong[i];
    }

    // ** explain this
    document.getElementById("currentWord").innerText = guessingSongText;
    document.getElementById("guessesRemaining").innerText = "Guesses Till Death: " + guessesRemaining;
    document.getElementById("guessedLets").innerText = "Letters Used: " + guessedLets;
};


// the hanging process - image updating in response to guesses
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (lives - guessesRemaining) + ".png";
};

// Find the guesses in the string
function evaluateGuess(letter) {
    var positions = [];

    // This is the loop to find and store the guessed letters
    for (var i = 0; i < songArray[currentSongIndex].length; i++) {
        if(songArray[currentSongIndex][i] === letter) {
            positions.push(i);
        }
    }

    // ** explain what I did here..
    if (positions.length <= 0) {
        guessesRemaining--;
        updateHangmanImage();
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
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
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
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
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