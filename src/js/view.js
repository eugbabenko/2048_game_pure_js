/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
export default class View {
  constructor(dom, observer) {
    this.observer = observer;
    this.dom = dom;
    this.observer.addObserver(({ board, rows, columns, score, bestScore, history }) => {
      this.displayBoard(board, rows, columns);
      this.displayScore(score);
      this.displayHistory(history);
      this.displayBestScore(bestScore);
    });
  }

  displayBoard(board, rows, columns) {
    const parentNode = this.dom.getElementByID('board');
    parentNode.innerHTML = '';

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const tile = this.dom.createElement('div');
        tile.id = `${i.toString()}-${j.toString()}`;
        const num = board[i][j];
        tile.innerText = '';
        tile.classList.value = ''; // clear the classList
        tile.classList.add('tile');
        if (num > 0) {
          tile.innerText = num.toString();
          if (num <= 4096) {
            tile.classList.add(`x${num.toString()}`);
          } else {
            tile.classList.add('x8192');
          }
        }
        this.dom.getElementByID('board').append(tile);
      }
    }
  }

  displayScore(score) {
    this.dom.getElementByID('score').innerText = score;
  }

  displayBestScore(bestScore) {
    this.dom.getElementByID('best-score').innerText = bestScore;
  }

  displayHistory(history) {
    const table = this.dom.getElementBySelector('tbody');
    table.innerHTML = `<tr><th>Date</th><th>Score</th></tr>`;
    if (history.length > 4) {
      history = history.slice(-4);
    }

    history.forEach((row) => {
      const tr = this.dom.createElement('tr');
      const tdScore = this.dom.createElement('td');
      const tdDate = this.dom.createElement('td');
      tdScore.textContent = row[1];
      tdDate.textContent = row[0];
      tr.append(tdDate);
      tr.append(tdScore);
      table.append(tr);
    });
  }
}
