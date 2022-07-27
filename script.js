"use strict";

// Selecting elements

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNewGame = document.getElementsByClassName("btn-new-game");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const scoreboardEl = document.querySelector(".scoreboard");
const mainGameBoardEl = document.querySelector(".main");
const winningPlayerNameEl = document.querySelector(".scoreboard p");

// Starting conditions

let scores, currentScore, activePlayer, playing, winningPlayerName;

let gamingScore, rejectDiceNum;

const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");

    mainGameBoardEl.classList.remove("hidden");
    scoreboardEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
};

const inputFromUser = function () {
    gamingScore = prompt("Please Enter Gaming Score:");
    rejectDiceNum = prompt("Please Enter Reject Dice Number:");
};

init();
inputFromUser();

let switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        if (dice != rejectDiceNum) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= gamingScore) {
            if (activePlayer === 0) {
                winningPlayerName = 1;
            } else {
                winningPlayerName = 2;
            }
            playing = false;
            diceEl.classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--active");
            scoreboardEl.classList.remove("hidden");
            mainGameBoardEl.classList.add("hidden");
            winningPlayerNameEl.innerText = `Player ${winningPlayerName} is win 🎉`;
        } else {
            switchPlayer();
        }
    }
});

for (const btnNew of btnNewGame) {
    btnNew.addEventListener("click", init);
}
