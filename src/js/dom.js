export default class DOM {
  constructor(model) {
    this.model = model;
  }

  setGame() {
    this.model.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let r = 0; r < this.model.rows; r++) {
      for (let c = 0; c < this.model.columns; c++) {
        this.tile = document.createElement('div');
        this.tile.id = `${r.toString()  }-${  c.toString()}`;
        this.num = this.model.board[r][c];
        this.updateTile(this.tile, this.num);
        document.getElementById('board').append(this.tile);
      }
    }
    // create 2 to begin the game
    this.setTwo();
    this.setTwo();
  }

  updateTile(tile, num) {
    tile.innerText = '';
    tile.classList.value = ''; // clear the classList
    tile.classList.add('tile');
    if (num > 0) {
      tile.innerText = num.toString();
      if (num <= 4096) {
        tile.classList.add(`x${  num.toString()}`);
      } else {
        tile.classList.add('x8192');
      }
    }
  }

  setTwo() {
    if (!this.model.hasEmptyTile()) {
      return;
    }
    this.found = false;
    while (!this.found) {
      // find random row and column to place a 2 in
      this.row = Math.floor(Math.random() * this.model.rows);
      this.column = Math.floor(Math.random() * this.model.columns);
      if (this.model.board[this.row][this.column] === 0) {
        this.model.board[this.row][this.column] = 2;
        this.tile = document.getElementById(
          `${this.row.toString()  }-${  this.column.toString()}`
        );
        this.tile.innerText = '2';
        this.tile.classList.add('x2');
        this.found = true;
      }
    }
  }
}
