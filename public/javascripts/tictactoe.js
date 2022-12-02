class Gameboard {
  static hitFields = [];
  static xFields = [];
  static yFields = [];
}

function initializeBoard() {
  let board = document.getElementsByClassName('square');

  for (let i = 0; i < board.length; i++) {
    board[i].addEventListener('click', playRound);
  }
}
function playRound(e) {
  Gameboard.hitFields.push(e.target.id);
  Gameboard.xFields.push(e.target.id);
  e.target.removeEventListener('click', playRound);
  e.target.textContent = 'x';
  e.target.classList.add('active');
  if (checkForWin(Gameboard.xFields)) {
    const winningModal = document.getElementsByClassName('player-won')[0];
    winningModal.style.display = 'flex';
  } else {
    aiRandom();
  }
}

function aiRandom(callNum = 0) {
  let aiChoice = String(Math.floor(Math.random() * 9));
  for (let i = 0; i < Gameboard.hitFields.length; i++) {
    if (aiChoice === Gameboard.hitFields[i]) {
      if (callNum < 9) {
        return aiRandom(callNum + 1);
      }
    }
  }

  Gameboard.hitFields.push(aiChoice);
  Gameboard.yFields.push(aiChoice);
  const hitSquare = document.getElementById(`${aiChoice}`);
  hitSquare.textContent = 'o';
  hitSquare.classList.add('active');
  hitSquare.removeEventListener('click', playRound);
  if (checkForWin(Gameboard.yFields) || checkForDraw()) {
    const winningModal = document.getElementsByClassName('ai-won')[0];
    winningModal.style.display = 'flex';
  }
}

function checkForWin(fieldChecked) {
  let count = 0;
  const winConditions = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (fieldChecked.includes(winConditions[i][j])) {
        count++;
        if (count === 3) {
          let board = document.getElementsByClassName('square');

          for (let i = 0; i < board.length; i++) {
            board[i].removeEventListener('click', playRound);
          }
          return true;
        }
      }
    }
    count = 0;
  }
  return false;
}
function checkForDraw() {
  let board = document.getElementsByClassName('square');

  for (let i = 0; i < board.length; i++) {
    if (!board[i].classList.contains('active')) {
      return false;
    }
  }
  return true;
}

initializeBoard();
