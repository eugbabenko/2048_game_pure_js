export default class View {
  constructor(dom, model) {
    this.dom = dom;
    this.model = model;
  }

  displayBoard(board, rows, columns) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        this.tile = this.dom.createElement('div');
        this.tile.id = `${r.toString()}-${c.toString()}`;
        this.num = board[r][c];
        this.displayTile(this.tile, this.num);
        this.dom.getElementByID('board').append(this.tile);
      }
    }
  }

  displayTile(tile, num) {
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
  }

  displayScore() {
    this.dom.getElementByID('score').innerText = this.model.getScore();
  }

  displayBestScore() {
    this.dom.getElementByID('best-score').innerText = this.model.getBestScore();
  }

  displayHistory() {
    const table = this.dom.getElementBySelector('tbody');
    let history = this.model.getHistory();
    table.innerHTML = `<tr><th>Date</th><th>Score</th></tr>`;
    if (this.model.getHistory().length > 4) {
      history = this.model.getHistory().slice(-4);
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
