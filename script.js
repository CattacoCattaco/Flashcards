const FLASHCARD = document.getElementById("flashcard");
const FLASHCARD_TEXT = document.getElementById("flashcard-text");
const PREV_BUTTON = document.getElementById("prev-button");

let cards = [
    {
        term: "Does the Earth orbit the Sun?",
        answer: "True",
    },
    {
        term: "Does the Sun orbit the Earth?",
        answer: "False",
    },
];

let sequence = [];

window.onload = main;

let card;
let index = -1;
let termFace = true;

function main() {
    nextCard();
    PREV_BUTTON.disabled = true;
}

function prevCard() {
    if(index == 0) {
        return;
    }

    index--;

    card = sequence[index];
    termFace = true;

    FLASHCARD_TEXT.innerText = card.term;

    if(index == 0) {
        PREV_BUTTON.disabled = true;
    }
}

function nextCard() {
    index++;
    if(index >= sequence.length) {
        sequence.push(cards[Math.floor(Math.random() * cards.length)]);
    }

    card = sequence[index];
    termFace = true;

    FLASHCARD_TEXT.innerText = card.term;

    PREV_BUTTON.disabled = false;
}

function flipCard() {
    if(termFace) {
        FLASHCARD_TEXT.innerText = card.answer;
        termFace = false;
    }
    else {
        FLASHCARD_TEXT.innerText = card.term;
        termFace = true;
    }
}