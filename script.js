function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let minGuess;
let maxGuess;
let currentGuess;

function initializeGame() {
    minGuess = 1;
    maxGuess = 101; // 101 because it's exclusive
    currentGuess = getRandomNumber(minGuess + 5, maxGuess - 5);
    document.getElementById('guess').textContent = currentGuess;
}

let guessCount = 1;
let bestGuessCount = Infinity;

function updateGuess(response) {
    guessCount++; 

    if (response === 'low') {
        minGuess = currentGuess + 1;
    } else if (response === 'high') {
        maxGuess = currentGuess;
    }
    currentGuess = binarySearchRecursive((minGuess + maxGuess) / 2, values, 0, values.length - 1);
    console.log('Computeren gættede: ' + currentGuess);

    if (currentGuess === -1) {
        console.log('Tallet blev ikke fundet!');
        resetGame();
    } else if (minGuess === maxGuess) {
        console.log('Det var det eneste mulige svar!');
        console.log('Antal gæt: ' + guessCount);

        if (guessCount < bestGuessCount) {
            bestGuessCount = guessCount;
            console.log('Nyt bedste antal gæt!');
        }
        resetGame();
    }
}

function resetGame() {
    initializeGame();
    guessCount = 1;
}

function binarySearchRecursive(value, values, start, end) {
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
