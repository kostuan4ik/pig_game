'use strict';

// Elements selection
const score0Element = document.getElementById('score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game initial conditions

// We create variables outside the function so that they can be seen, and assign values ​​inside the function
let totalScores, currentScore, activePlayer, isPlaying

const initGame = function () {
  
  // In the names of the players 0 and 1, because we will create an array
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  
  // Game state
  isPlaying = true;
  
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  diceElement.classList.add('hidden');
};

initGame()

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate a random number
    // We create inside the event handler, because every time we need a new number
    // Add 1 because otherwise it will range from 0 to 5
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;

    // 3. If the number is 1, switch to the next player, if not - add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      // Dynamic element selection based on activePlayer values
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to active player total score
    // Get the element at activePlayer index 0 or 1
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. If total score active player >= 100, active player won? if not - switch active player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

// New game!
// Pass the function as the second parameter, instead of calling an anonymous function
btnNew.addEventListener('click', initGame);
