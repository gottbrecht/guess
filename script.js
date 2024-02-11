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
    guessCount++; // Øg tælleren

    // Juster min og max værdier baseret på brugerens respons
    if (response === 'low') {
        minGuess = currentGuess + 1;
    } else if (response === 'high') {
        maxGuess = currentGuess;
    }

    // Beregn et nyt gæt ved hjælp af binary search
    currentGuess = binarySearchRecursive((minGuess + maxGuess) / 2, values, 0, values.length - 1);

    // Vis det nye gæt
    console.log('Computeren gættede: ' + currentGuess);

    // Fortsæt med næste gæt eller rapporter resultatet
    if (currentGuess === -1) {
        console.log('Tallet blev ikke fundet!');
        resetGame();
    } else if (minGuess === maxGuess) {
        console.log('Det var det eneste mulige svar!');
        console.log('Antal gæt: ' + guessCount);

        // Opdater hvis bedre resultater:
        if (guessCount < bestGuessCount) {
            bestGuessCount = guessCount;
            console.log('Nyt bedste antal gæt!');
        }

        // Nulstil spillet
        resetGame();
    }
}

function resetGame() {
    initializeGame();
    guessCount = 1;
}

// Din binarySearchRecursive funktion
function binarySearchRecursive(value, values, start, end) {
    if (start > end) {
        return -1; // Returnerer -1 hvis det ikke eksisterer
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

// Start spillet
initializeGame();
