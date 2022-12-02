const gameBoard = (() => {
  let board = new Array(9).fill(null); // board is an array of 9 spaces

  const setField = (indexID, sign) => {
    board[indexID] = sign;
  };

  const getFieldNode = (fieldIndex) => {
    return board[fieldIndex];
  };

  return {
    setField,
    getFieldNode,
    board,
  };
})();

const gameController = (() => {
  let gameisOver = false;
  let round = 1;
  const fieldNodeList = document.querySelectorAll('.square');
  const resetButton = document.getElementById('play-again');

  resetButton.addEventListener('click', () => {
    location.reload();
  });
  for (let i = 0; i <= fieldNodeList.length - 1; i++) {
    fieldNodeList[i].addEventListener(
      'click',
      (e) => {
        fieldNodeList[i].id = `${i}`;
        playRound(i, e, takeTurns());
        updateEmptyFields();
      },
      { once: true }
    ); // slick way to make the event only fire after the first click
  }

  const playRound = (fieldIndex, target, sign) => {
    if (gameisOver) {
      return;
    }
    gameBoard.setField(fieldIndex, sign);
    if (checkForWin(fieldIndex)) {
      displayController.updateFieldDisplay(target, sign);
      displayController.updateScoreDisplay(sign);
      gameisOver = true;
      return;
    }
    if (round < 9) {
      displayController.updateFieldDisplay(target, sign);
      round++;
    } else if (round === 9) {
      const draw = 'draw';
      displayController.updateFieldDisplay(target, sign);
      displayController.updateScoreDisplay(draw);
      gameisOver = true;
    }
  };

  const checkForWin = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getFieldNode(index) === takeTurns()
        )
      );
  };

  const updateEmptyFields = () => {
    const emptyFields = [];
    gameBoard.board.filter((element, index) => {
      if (element === null) {
        emptyFields.push(index);
      }
    });
    return emptyFields;
  };

  const takeTurns = () => {
    if (round % 2 === 1) {
      return 'x';
    } else {
      return 'o';
    }
  };
  return {
    updateEmptyFields,
    takeTurns,
    playRound,
  };
})();

const displayController = (() => {
  const scoreDisplayP = document.getElementById('score');
  const modal = document.getElementById('hidden-modal');

  const modalWinner = () => {
    modal.style.display = 'flex';
  };

  const updateFieldDisplay = (eventTarget, sign) => {
    eventTarget.target.firstChild.textContent = `${sign}`;
    if (sign === 'x') {
      eventTarget.target.firstChild.style.color = '#0000A3';
    } else {
      eventTarget.target.firstChild.style.color = '#DF265E';
    }
  };
  const updateScoreDisplay = (winner) => {
    if (winner === 'draw') {
      scoreDisplayP.textContent = `It's a Draw!`;
    } else {
      scoreDisplayP.textContent = `The winner is ${winner}!`;
    }
    modalWinner();
  };
  return {
    updateFieldDisplay,
    updateScoreDisplay,
    modalWinner,
  };
})();

const Player = (sign) => {
  const playerSign = () => {
    return sign;
  };
  return {
    playerSign,
  };
};
