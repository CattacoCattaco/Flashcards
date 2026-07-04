const GUESS_COUNTS_CHART_AREA = document.getElementById("guess-counts-chart-area");
const AVERAGE_GUESS_COUNT_LABEL = document.getElementById("average-guess-count-label");
const CARDS_TO_FOCUS_ON_AREA = document.getElementById("cards-to-focus-on-area");

let cards = [
    {
        term: "Does the Earth orbit the Sun?",
        answer: "True",
        guesses: 1,
    },
    {
        term: "Does the Sun orbit the Earth?",
        answer: "False",
        guesses: 1,
    },
    {
        term: "Is the Moon round?",
        answer: "True",
        guesses: 1,
    },
    {
        term: "Is the Earth flat?",
        answer: "False",
        guesses: 1,
    },
    {
        term: "How many letters are in the alphabet?",
        answer: "26",
        guesses: 5,
    },
    {
        term: "How do you say hi in Spanish?",
        answer: "Hola",
        guesses: 2,
    },
    {
        term: "How do you say yes in Spanish?",
        answer: "Si",
        guesses: 2,
    },
    {
        term: "How do you say to be called in Spanish?",
        answer: "Llamarse",
        guesses: 4,
    },
    {
        term: "How many world wars have there been?",
        answer: "Two",
        guesses: 3,
    },
    {
        term: "How many phases of the moon are there?",
        answer: "Eight",
        guesses: 3,
    },
    {
        term: "How do you say bathroom in Spanish?",
        answer: "Baño",
        guesses: 7,
    },
];

let guessCountCounts = [];
let cardsSortedByGuessCounts = [];
let cardsToFocusOn = [];

let cardsToFocusOnPositions = [
    [],
    ["center"],
    ["top left", "bottom right"],
    ["top left", "center", "bottom right"],
    ["top left", "top right", "bottom left", "bottom right"],
    ["top left", "top right", "center", "bottom left", "bottom right"],
]

window.onload = main;

function main() {
    for(let i = 0; i < cards.length; i++) {
        let card = cards[i];
        while(guessCountCounts.length < card.guesses) {
            guessCountCounts.push(0);
        }
        guessCountCounts[card.guesses - 1]++;
    }

    let guessCountBuckets = [];
    for(let i = 0; i < guessCountCounts.length; i++) {
        guessCountBuckets.push([]);
    }

    for(let i = 0; i < cards.length; i++) {
        let card = cards[i];
        guessCountBuckets[card.guesses - 1].push(card);
    }

    for(let i = 0; i < guessCountBuckets.length; i++) {
        for(let j = 0; j < guessCountBuckets[i].length; j++) {
            cardsSortedByGuessCounts.push(guessCountBuckets[i][j]);
        }
    }
    
    let averageGuessCount = 0;

    for(let i = 0; i < guessCountCounts.length; i++) {
        averageGuessCount += guessCountCounts[i] * (i + 1);
    }

    averageGuessCount /= cards.length;

    AVERAGE_GUESS_COUNT_LABEL.textContent = `Average guess count: ${averageGuessCount.toPrecision(4)}`;

    let barHeight = 95 / guessCountCounts.length * 5 / 9;
    let barMargin = 95 / guessCountCounts.length * 2 / 9;

    for(let i = 0; i < guessCountCounts.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("guess-count-bar");
        GUESS_COUNTS_CHART_AREA.appendChild(bar);
        bar.style.setProperty("--height", barHeight);
        bar.style.setProperty("--margin", barMargin);

        let barLabel = document.createElement("p");
        barLabel.classList.add("guess-count-bar-label");
        bar.appendChild(barLabel);
        barLabel.innerText = String(i + 1);

        let barBG = document.createElement("div");
        barBG.classList.add("guess-count-bar-bg");
        bar.appendChild(barBG);

        let barFG = document.createElement("div");
        barFG.classList.add("guess-count-bar-fg");
        barBG.appendChild(barFG);
        barFG.style.setProperty("--percent", guessCountCounts[i] / cards.length * 100);
    }

    for(let i = cardsSortedByGuessCounts.length - 1; i >= cardsSortedByGuessCounts.length - 5; i--) {
        let card = cardsSortedByGuessCounts[i];

        if(card.guesses > averageGuessCount) {
            cardsToFocusOn.push(card);
        }
        else {
            break;
        }
    }

    for(let i = 0; i < cardsToFocusOn.length; i++) {
        let card = cardsToFocusOn[i];

        let flashcard = document.createElement("div");
        flashcard.classList.add("flashcard-mini");
        flashcard.id = `card-to-focus-on-${i}`;
        flashcard.setAttribute("position", cardsToFocusOnPositions[cardsToFocusOn.length][i]);
        CARDS_TO_FOCUS_ON_AREA.appendChild(flashcard);

        let cardText = document.createElement("span");
        cardText.classList.add("flashcard-text");
        cardText.id = `card-to-focus-on-label-${i}`;
        cardText.innerText = card.term;
        flashcard.appendChild(cardText);

        let flipCardButton = document.createElement("button");
        flipCardButton.classList.add("flip-card-button");
        flipCardButton.id = `card-to-focus-on-button-${i}`;
        flashcard.setAttribute("onmouseenter", `hoverCard(${i})`);
        flashcard.setAttribute("onmouseleave", `unhoverCard(${i})`);
        flashcard.setAttribute("onclick", `flipCard(${i})`);
        flashcard.appendChild(flipCardButton);
    }
}

function hoverCard(id) {
    document.getElementById(`card-to-focus-on-${id}`).style.setProperty("z-index", 2);
}

function unhoverCard(id) {
    document.getElementById(`card-to-focus-on-${id}`).style.setProperty("z-index", "inherit");
}

function flipCard(id) {
    let card = cardsToFocusOn[id];
    let cardText = document.getElementById(`card-to-focus-on-label-${id}`);
    if(cardText.innerText == card.term) {
        cardText.innerText = card.answer;
    }
    else {
        cardText.innerText = card.term;
    }
}