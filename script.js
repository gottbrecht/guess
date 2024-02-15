"use strict";

//const values = [1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15];
let minGuess;
let maxGuess;
let currentGuess;
let guessCount = 1;
let bestGuessCount = Infinity;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Initialize the game:
function initializeGame() {
    minGuess = 1;
    maxGuess = 101; // 101 because it's exclusive
    currentGuess = getRandomNumber(minGuess + 5, maxGuess - 5);
    document.getElementById('guess').textContent = "";
}

//based on the users response
function updateGuess(response) {
    guessCount++;

    if (response === 'low') {
        minGuess = currentGuess + 1;
    } else if (response === 'high') {
        maxGuess = currentGuess;
    }

    binarySearchGame();
}

function binarySearchGame() { // performs a binary search to guess the correct number. It uses confirm to ask the user if the current guess is correct. Based on the user's response, it adjusts minGuess and maxGuess. 
    while (minGuess <= maxGuess) {
        let currentGuess = Math.floor((minGuess + maxGuess) / 2);
        let userResponse = confirm(`Is ${currentGuess} your number?`);
        if(userResponse) {
            alert('Perfect! Computer guessed the right number ${currentGuess} at ${guessCount} guesses.');
        
            if(guessCount < bestGuessCount) {
                bestGuessCount = guessCount;
                console.log('Woow! The bedst guess!');
            }

            resetGame();
            break;
        }else {
            let tooHigh = confirm(`Is ${currentGuess} too high?`);

            if(tooHigh) {
                maxGuess = currentGuess - 1;
            }else {
                minGuess = currentGuess + 1;
            }
        }
    }
}

function resetGame() { //resets the game
    initializeGame();
    guessCount = 1;
}
initializeGame();

document.getElementById('tooLowButton').addEventListener('click', function() {
    updateGuess('low');
});

document.getElementById('tooHighButton').addEventListener('click', function() {
    updateGuess('high');
});

document.getElementById('correctButton').addEventListener('click', function() {
    console.log('Correct button clicked');  
});

document.getElementById('tryAgainButton').addEventListener('click', function() {
    resetGame();
    console.log('Try Again button clicked');  
});
