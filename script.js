const cards = [
    "fa-leaf", "fa-leaf",
    "fa-cube", "fa-cube",
    "fa-solid fa-car", "fa-solid fa-car",
    "fa-diamond", "fa-diamond",
	"fa-bicycle", "fa-bicycle",
    "fa-paper-plane-o", "fa-paper-plane-o",
	"fa-bolt", "fa-bolt",
	"fa-bomb", "fa-bomb",
];

let openCards = [];
let matchedCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;

// ///________///LIST OF VARIABLES///________
const cardsList = document.querySelectorAll('.card'); //nodelist of cards
const stars = document.querySelector('.ul.stars li'); //selecting all stars
const reset = document.querySelector('.fa-repeat'); //restart button
const deck = document.querySelector('.deck');


//HERE I HAVE FUNCTIONS FOR MY GAME//________________________________________________________________

//GRID IS INPUTED HERE
const generateGrid = (card) => {
    return `<li class="card">
            <i class="fa ${card}"></i>
        </li>`
} 


//SHUFFLE FUNCTION
const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0 ) {
        randomIndex = Math.floor(Math.random() * currentIndex );
        currentIndex -=1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//END GAME HERE/////
const endGame = () => {
    //stop clockId
    //congrats message
}

////////START GAME______//
const startGame = () => {
    const deck = document.querySelector('.deck');//shuffle deck
    let cardHTML = shuffle(cards).map ((card) => {
        return generateGrid(card);
    });
    deck.innerHTML = (cardHTML.join('')); //It should generate back grid
    //restart clock too
    //rrstart moves counter
    //and call new shuffled deck
}
startGame();

//FOR THE MOVES ASPECT OF THE GAME
const addMoves = () => {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

const checkScore = () => {
    if (moves === 2 || moves === 3 ) {
        hideStar();
        console.log('test checkscore')
    }
}

const hideStar = () => { //applying hide property to star
    const starList = document.querySelectorAll('.stars li');
    for (stars of starList) {
        if (stars.style.display !== 'none') {
            stars.style.display = 'none';
            break;
        }
    }

}

//////GAME FUNCTIONALITIES //////
const evaluateClick =(clickTarget) => {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('open') && //prevent clicking open cards
        !clickTarget.classList.contains('match') && //prevent clicking on matched cards
        openCards.length < 2 && //prevent more than 3 cards firing event
        !openCards.includes(clickTarget) // prevents double click on one card

    );
}

deck.addEventListener('click', event => {
    const clickTarget = event.target;

    if(evaluateClick(clickTarget)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget); //to open cards
        openCards.push(clickTarget); //it send to openCards array

        if (openCards.length === 2) {
            checkIfCardsMatch();
            addMoves();
            checkScore();
        }
    }
})

//TOGGLE THE CARD CLASS ON/OFF 
const toggleCard = (clickTarget) => {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

//CHECKS FOR MATCH CARD
const checkIfCardsMatch = () => {
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        openCards[0].classList.toggle('match',);
        openCards[1].classList.toggle('match',); //CARDS MATCHED
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]); //send to matched cards array
        openCards = [];
    }
    else {
        setTimeout(() => {
            openCards.forEach ((card) => { //flips over all cards
                card.classList.remove('open', 'show');
            });

            openCards.length = 0; //empties OpenCards
        }, 600);
    }
}

const displayTime = () => { //creating a timer in the score panel
    const minutes = Math.floor (time / 60);
    const seconds = time % 60;
    const clock = document.querySelector ('.clock');
    clock.innerHTML =time;
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    }else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }

}

const startClock = () => { //print seconds in d console
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);

}
// startClock();

const stopClock = () => { //stop clock
    clearInterval(clockId);
    clockOff = true;
}

//_______MODAL_________//
const toggleModal = () => {
    const modal = document.querySelector ('.modal_background');
    modal.classList.toggle('hide');
}
toggleModal() //opem modal
toggleModal() //close modal

//MODAL TESTS
moves=16;
checkScore();

writeModalStats();
toggleModal();

const writeModalStats = () => {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    let stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

const getStars = () => {
    stars = querySelector('stars li');
    starCount = 0;
    for (stars of stars) {
        if (stars.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
}
