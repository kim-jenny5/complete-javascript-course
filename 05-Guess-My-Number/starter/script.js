'use strict';

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const correctNum = document.querySelector('.number');
const currentScore = document.querySelector('.score');

function displayMsg(message) {
  document.querySelector('.message').textContent = message;
}

function reset() {
  secretNum = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  currentScore.textContent = score;
  displayMsg(`Start guessing...`);
  correctNum.textContent = `?`;
  correctNum.style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.check').addEventListener('click', gameStart);
  document.body.style.backgroundColor = '#222';
}

function gameStart() {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMsg(`🚨 Oops. Not a number!`);
  } else if (guess === secretNum) {
    displayMsg(`🥳 Correct!`);
    correctNum.textContent = secretNum;
    currentScore.textContent = score;
    document.body.style.backgroundColor = '#60b347';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNum) {
    if (score > 1) {
      displayMsg(
        guess > secretNum ? `😅 A bit too high.` : `😅 A bit too low.`
      );
      score--;
      currentScore.textContent = score;
    } else {
      gameLost();
    }
  }
}

function gameLost() {
  currentScore.textContent = 0;
  displayMsg(`😩 Wah wah~ You've lost.`);
}

document.querySelector('.check').addEventListener('click', gameStart);
document.querySelector('.again').addEventListener('click', reset);
