/*"use strict";
window.addEventListener("load", start);*/ //Peter's input

function getRandomNumber() {
    return Math.floor(Math.random() * 100) +1;
}

let currentGuess = getRandomNumber();
document.getElementById('guess').textContent = currentGuess;

function checkGuess(response) {
    if(response === 'low' || response === 'high') {
        currentGuess = getRandomNumber();
        document.getElementById('guess').textContent = currentGuess;
    }else if (response === 'correct') {
        document.getElementById('output').innerHTML = "<strong>Computer was correct!</strong><br>The Number is: " + currentGuess;
    }
}