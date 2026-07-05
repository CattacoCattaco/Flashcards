const CARDS_LIST = document.getElementById("cards-list");

let cardCount = 0;

window.onload = main;

function main() {
    addCard();
}

function addCard() {
    cardCount++;

    let cardEdit = document.createElement("div");
    cardEdit.classList.add("card-edit");
    cardEdit.id = `card-edit-${cardCount}`;
    CARDS_LIST.appendChild(cardEdit);

    let label = document.createElement("p");
    label.classList.add("card-edit-label");
    label.id = `card-edit-label-${cardCount}`;
    label.innerText = `Card ${cardCount}:`;
    cardEdit.appendChild(label);

    let termEdit = document.createElement("input");
    termEdit.type = "text";
    termEdit.id = `term-edit-${cardCount}`;
    termEdit.placeholder = "Term";
    cardEdit.appendChild(termEdit);

    let answerEdit = document.createElement("input");
    answerEdit.type = "text";
    answerEdit.id = `answer-edit-${cardCount}`;
    answerEdit.placeholder = "Answer";
    cardEdit.appendChild(answerEdit);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("card-edit-delete-button");
    deleteButton.id = `card-edit-delete-button-${cardCount}`;
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteCard(${cardCount})`);
    cardEdit.appendChild(deleteButton);
}

function deleteCard(cardIndex) {
    document.getElementById(`card-edit-${cardIndex}`).remove();

    for(let i = cardIndex; i < cardCount; i++) {
        document.getElementById(`card-edit-${i + 1}`).id = `card-edit-${i}`;
        document.getElementById(`term-edit-${i + 1}`).id = `term-edit-${i}`;
        document.getElementById(`answer-edit-${i + 1}`).id = `answer-edit-${i}`;

        let label = document.getElementById(`card-edit-label-${i + 1}`);
        label.id = `card-edit-label-${i}`;
        label.innerHTML = `Card ${i}:`;

        let deleteButton = document.getElementById(`card-edit-delete-button-${i + 1}`);
        deleteButton.id = `card-edit-delete-button-${i}`;
        deleteButton.setAttribute("onclick", `deleteCard(${i})`);
    }

    cardCount--;
}