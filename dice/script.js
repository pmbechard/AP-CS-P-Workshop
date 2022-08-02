const dieOne = document.getElementById('die-1');
const dieTwo = document.getElementById('die-2');
const start = document.getElementById('start-btn');
const guess = document.getElementById('guess');

start.addEventListener('click', () => {
  !guessIsValid() ? showInvalidInput() : rollDice();
});

function rollDice() {
  const animationInterval = setInterval(startRollAnimation, 75);
  setTimeout(() => {
    clearInterval(animationInterval);
    [resultOne, resultTwo] = getRollResults();
    showRollResults(resultOne, resultTwo);
    showGuessResults(checkGuess(resultOne, resultTwo));
  }, 3000);
}

function startRollAnimation() {
  let dieOneNum = parseInt(dieOne.src.charAt(dieOne.src.length - 5));
  if (dieOneNum === 6) dieOneNum -= 6;
  dieOne.src = `./img/dice-${dieOneNum + 1}.svg`;

  let dieTwoNum = parseInt(dieTwo.src.charAt(dieTwo.src.length - 5));
  if (dieTwoNum === 1) dieTwoNum += 6;
  dieTwo.src = `./img/dice-${dieTwoNum - 1}.svg`;
}

function getRollResults() {
  const resultOne = parseInt(Math.random() * 6) + 1;
  const resultTwo = parseInt(Math.random() * 6) + 1;
  return [resultOne, resultTwo];
}

function showRollResults(resultOne, resultTwo) {
  dieOne.src = `./img/dice-${resultOne}.svg`;
  dieTwo.src = `./img/dice-${resultTwo}.svg`;
}

function guessIsValid() {
  return parseInt(guess.value) >= 2 && parseInt(guess.value) <= 12;
}

function showInvalidInput() {
  guess.classList.add('invalid');
}

guess.addEventListener('change', () => {
  guessIsValid()
    ? guess.classList.remove('invalid')
    : guess.classList.add('invalid');
});

function checkGuess(resultOne, resultTwo) {
  const results = resultOne + resultTwo;
  return parseInt(guess.value) === results;
}

function showGuessResults(isCorrect) {
  const toastMsg = document.getElementById('resultMsg');
  const toast = new bootstrap.Toast(toastMsg);
  setToastMsg(isCorrect);
  toast.show();
}

function setToastMsg(isCorrect) {
  const resultMsg = document.getElementById('toast-body');
  isCorrect
    ? (resultMsg.textContent = 'Correct!')
    : (resultMsg.textContent = 'Incorrect!');
}
