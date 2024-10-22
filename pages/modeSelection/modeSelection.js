'use strict';

function startGame(isRivotril) {
  const boardSize = document.getElementById('tabuleiro_input').value;
  const bombs = document.getElementById('bombas_input').value;

  if (!boardSize || !bombs) {
      alert('Por favor, preencha o tamanho do tabuleiro e a quantidade de bombas.');
      return;
  }

  const boardSizeInt = parseInt(boardSize);
  const bombsInt = parseInt(bombs);

  const maxBombs = Math.round((boardSizeInt * boardSizeInt) * 0.20);

  if (bombsInt >= maxBombs) {
      alert('O número de bombas deve ser menor do que ' + maxBombs);
      return;
  }

  const gameSettings = {
      boardSize: boardSizeInt,
      bombs: bombsInt,
      rivotrilMode: isRivotril
  };

  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));

  if (isRivotril) {
      window.location.href = '../play/modoNormal.html';
  } else {
      window.location.href = '../play/modoNormal.html';
  }
}
