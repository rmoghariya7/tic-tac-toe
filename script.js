const cells = document.querySelectorAll('.tic-tac');
const gridContainer = document.querySelector('.grid-container');
const turnText = document.querySelector('#turnText');
const modal = document.querySelector('.modal');
const turnText2 = document.querySelector('#turnText2');
const restartBtn = document.querySelector('.restart');
const undo = document.querySelector('#undo');
let undoArr = [];
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const input = ['', '', '', '', '', '', '', '', ''];

const X_TURN = 'X';
const O_TURN = 'O';

let currentPlayer = X_TURN;

initializeGame();

function initializeGame() {
  modal.style.display = 'none';
  currentPlayer = X_TURN;
  [...cells].forEach((cell) => (cell.innerHTML = ''));
  input.fill('');
  startGame();
}

function changeTurn() {
  currentPlayer = currentPlayer == X_TURN ? O_TURN : X_TURN;
}

function startGame() {
  turnText.innerHTML = `${currentPlayer}'s turn`;
  const cells = document.querySelectorAll('.tic-tac');
  [...cells].forEach((cell) => {
    cell.addEventListener('click', function (e) {
      handleclick(e);
    });
  });
}

function winLose() {
  let winTo = false;
  winCondition.forEach((condition) => {
    if (
      input[condition[0]] == input[condition[1]] &&
      input[condition[1]] == input[condition[2]] &&
      input[condition[0]] != '' &&
      input[condition[1]] != '' &&
      input[condition[2]] != ''
    ) {
      turnText.innerHTML = `${
        currentPlayer == X_TURN ? O_TURN : X_TURN
      } Winner`;
      turnText2.innerHTML = `${
        currentPlayer == X_TURN ? O_TURN : X_TURN
      } Winner`;
      modal.style.display = 'flex';
      winTo = true;
    }
  });

  if (winTo) return;

  const drawChecker = input.every((cell) => {
    return cell != '';
  });

  if (drawChecker === true) {
    turnText.innerHTML = ` DRAW `;
    turnText2.innerHTML = ` DRAW `;
    modal.style.display = 'flex';
  }
}

function handleclick(e) {
  if (!e.target.textContent == '') return;

  currentIndex = e.target.dataset.number;
  input[currentIndex] = currentPlayer;
  e.target.innerHTML = currentPlayer;
  undoArr.push(currentIndex);
  changeTurn();
  winLose();
  turnText.innerHTML = `${currentPlayer}'s Turn`;
}

restartBtn.addEventListener('click', function () {
  currentPlayer = X_TURN;
  undoArr = [];
  const cells = document.querySelectorAll('.tic-tac');
  [...cells].forEach((cell) => (cell.innerHTML = ''));
  [...cells].forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
  initializeGame();
  turnText.innerHTML = `${currentPlayer}'s Turn`;
});

undo.addEventListener('click', function () {
  displaySpin();
  const cells = document.querySelectorAll('.tic-tac');
  const poppedEl = undoArr.pop();

  if (undoArr.length == 0) {
    currentPlayer = X_TURN;
    turnText.innerHTML = `${currentPlayer}'s Turn`;
  } else {
    currentPlayer =
      input[poppedEl] == 'X'
        ? (currentPlayer = X_TURN)
        : (currentPlayer = O_TURN);
    turnText.innerHTML = `${currentPlayer}'s Turn`;
  }
  input[poppedEl] = '';
  [...cells].forEach((cell, index) => (cell.innerHTML = input[index]));
});

const loader = document.querySelector('#loading');

function displaySpin() {
  undo.classList.add('spin');
  setTimeout(() => {
    undo.classList.remove('spin');
  }, 500);
}
