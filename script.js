"use strict";

const values = [1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15];

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
    document.getElementById('guess').textContent = currentGuess;
}

//based on the users response
function updateGuess(response) {
    guessCount++;

    if (response === 'low') {
        minGuess = currentGuess + 1;
    } else if (response === 'high') {
        maxGuess = currentGuess;
    }

    // to get the next guess - execute binary search:
    currentGuess = binarySearchRecursive((minGuess + maxGuess) / 2, values, 0, values.length - 1);

    console.log('Computer guessed: ' + currentGuess);

    if (currentGuess === -1) {
        console.log('Number not found');
        resetGame();
    } else if (minGuess === maxGuess) {
        console.log('That\'s the answer!');
        console.log('Amount of guesses: ' + guessCount);

        if (guessCount < bestGuessCount) {
            bestGuessCount = guessCount;
            console.log('Best guess!');
        }
        resetGame();
    }
}


function resetGame() { //resets the game
    initializeGame();
    guessCount = 1;
}


function binarySearchRecursive(value, values, start, end) { //binary search
    if (start > end) {
        return -1;
    }

    let middle = Math.floor((start + end) / 2);
    const lookAt = values[middle];

    if (value === lookAt) {
        return middle;
    } else if (value > lookAt) {
        return binarySearchRecursive(value, values, middle + 1, end);
    } else if (value < lookAt) {
        return binarySearchRecursive(value, values, start, middle - 1);
    }
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
    console.log('Try Again button clicked');  
});
