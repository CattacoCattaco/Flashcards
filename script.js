const FLASHCARD = document.getElementById("flashcard");
const FLASHCARD_TEXT = document.getElementById("flashcard-text");

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

window.onload = main;

let card;
let termFace = true;

function main() {
    card = cards[Math.floor(Math.random() * cards.length)];

    FLASHCARD_TEXT.innerText = card.term;
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