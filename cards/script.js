const FLASHCARD = document.getElementById("flashcard");
const FLASHCARD_TEXT = document.getElementById("flashcard-text");
const PREV_BUTTON = document.getElementById("prev-button");
const NEXT_BUTTON = document.getElementById("next-button");
const CORRECT_BUTTON = document.getElementById("correct-button");
const WRONG_BUTTON = document.getElementById("wrong-button");
const RECLASSIFY_BUTTON = document.getElementById("reclassify-button");

let cards;

let unusedCards = [];

let correctCards = [];
let incorrectCards = [];

let reuseCardChance = 0.15;

let sequence = [];

window.onload = main;

let card;
let index = -1;
let termFace = true;

function main() {
    cards = JSON.parse(sessionStorage.getItem("FC-cards"));

    for(let i = 0; i < cards.length; i++) {
        cards[i].guesses = 0;
    }

    reset();
}

function reset() {
    unusedCards = cards.slice();
    correctCards = [];
    incorrectCards = [];
    sequence = [];
    index = -1;
    generateNewCard();
    PREV_BUTTON.disabled = true;
}

function prevCard() {
    if(index == 0) {
        return;
    }

    NEXT_BUTTON.setAttribute("visible", "true");
    CORRECT_BUTTON.setAttribute("visible", "false");
    WRONG_BUTTON.setAttribute("visible", "false");

    index--;

    if(index == sequence.length - 2) {
        RECLASSIFY_BUTTON.setAttribute("visible", "true");
    }
    else {
        RECLASSIFY_BUTTON.setAttribute("visible", "false");
    }

    displayCurrentCard();

    if(index == 0) {
        PREV_BUTTON.disabled = true;
    }
}

function reclassifyPrevious() {
    if(RECLASSIFY_BUTTON.getAttribute("color") == "green") {
        RECLASSIFY_BUTTON.setAttribute("color", "red");
        RECLASSIFY_BUTTON.children[0].src = "images/wrong-button.svg";
        reclassifyCard(incorrectCards, correctCards);
    }
    else {
        RECLASSIFY_BUTTON.setAttribute("color", "green");
        RECLASSIFY_BUTTON.children[0].src = "images/correct-button.svg";
        reclassifyCard(correctCards, incorrectCards);
    }
}

function reclassifyCard(from, to) {
    for(let i = from.length - 1; i >= 0; i--) {
        if(from[i] == card) {
            from.splice(i);
        }
    }

    to.push(card);
}

function correct() {
    reclassifyCard(incorrectCards, correctCards);
    generateNewCard();
    RECLASSIFY_BUTTON.setAttribute("color", "red");
    RECLASSIFY_BUTTON.children[0].src = "images/wrong-button.svg";
}

function incorrect() {
    if(!incorrectCards.includes(card)) {
        incorrectCards.push(card);
    }

    generateNewCard();
    RECLASSIFY_BUTTON.setAttribute("color", "green");
    RECLASSIFY_BUTTON.children[0].src = "images/correct-button.svg";
}

function generateNewCard() {
    if(card) {
        card.guesses++;
    }

    if(unusedCards.length == 0 && incorrectCards.length == 0) {
        showStats();
        return;
    }
    
    let newCard;

    if((Math.random() < reuseCardChance || unusedCards.length == 0) && incorrectCards.length > 0) {
        newCard = incorrectCards[Math.floor(Math.random() * incorrectCards.length)];
        
        if(incorrectCards.length > 1) {
            while(card == newCard) {
                newCard = incorrectCards[Math.floor(Math.random() * incorrectCards.length)];
            }
        }
        else if(card == newCard) {
            if(unusedCards.length > 0) {
                let newCardIndex = Math.floor(Math.random() * unusedCards.length);
                newCard = unusedCards[newCardIndex];
                unusedCards.splice(newCardIndex, 1);

                sequence.push(newCard);
                
                nextCard();

                return;
            }

            index--;
            nextCard();
            return;
        }

        if(unusedCards.includes(newCard)) {
            let index = unusedCards.indexOf(newCard);
            console.log(unusedCards)
            console.log(index);
            unusedCards.splice(index, 1);
        }
    }
    else {
        let newCardIndex = Math.floor(Math.random() * unusedCards.length);
        newCard = unusedCards[newCardIndex];
        unusedCards.splice(newCardIndex, 1);
    }
    
    sequence.push(newCard);
    
    nextCard();
}

function nextCard() {
    index++;

    displayCurrentCard();

    PREV_BUTTON.disabled = false;

    if(index == sequence.length - 1) {
        NEXT_BUTTON.setAttribute("visible", "false");
        RECLASSIFY_BUTTON.setAttribute("visible", "false");
        CORRECT_BUTTON.setAttribute("visible", "true");
        WRONG_BUTTON.setAttribute("visible", "true");
    }
    else if(index == sequence.length - 2) {
        RECLASSIFY_BUTTON.setAttribute("visible", "true");
    }
    else {
        RECLASSIFY_BUTTON.setAttribute("visible", "false");
    }
}

function displayCurrentCard() {
    card = sequence[index];
    termFace = true;

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

function showStats() {
    sessionStorage.setItem("FC-cards", JSON.stringify(cards));

    const a = document.createElement('a');
    a.href = "stats/index.html";
    a.click();
}