const FLASHCARD = document.getElementById("flashcard");
const FLASHCARD_TEXT = document.getElementById("flashcard-text");
const NEXT_BUTTON = document.getElementById("next-button");
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
    {
        term: "Is the Moon round?",
        answer: "True",
    },
    {
        term: "Is the Earth flat?",
        answer: "False",
    },
];

let unusedCards = [];
let reuseCardChance = 0.1;

let sequence = [];

window.onload = main;

let card;
let index = -1;
let termFace = true;

function main() {
    reset();
}

function reset() {
    unusedCards = cards.slice();
    sequence = [];
    index = -1;
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
    if(unusedCards.length < 1) {
        reset();
        return;
    }

    index++;
    if(index >= sequence.length) {
        let newCard;

        if(Math.random() < reuseCardChance) {
            console.log("Hi");
            newCard = cards[Math.floor(Math.random() * cards.length)];
            while(card == newCard) {
                newCard = cards[Math.floor(Math.random() * cards.length)];
            }

            if(unusedCards.includes(newCard)) {
                let index = unusedCards.indexOf(newCard);
                console.log(unusedCards)
                console.log(index);
                unusedCards.splice(index, 1);
            }
        }
        else {
            console.log("B");
            let newCardIndex = Math.floor(Math.random() * unusedCards.length);
            newCard = unusedCards[newCardIndex];
            unusedCards.splice(newCardIndex, 1);
        }
        
        sequence.push(newCard);
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