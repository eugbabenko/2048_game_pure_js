export default class DOM {
    constructor(rows, columns){
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ];
        this.rows = rows
        this.columns = columns
    }

    startGame() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                this.tile = document.createElement('div')
                this.tile.id = `${row.toString()}-${column.toString()}`;
                this.number = this.board[row][column];
                this.updateTile(this.tile, this.number);
                document.querySelector('#board').append(this.tile);
            }
          }
          this.setTwo();
          this.setTwo();
    }

    updateTile(tile, number) {
        this.tile = tile;
        this.number = number;
        this.tile.innerText = '';
        this.tile.classList.value = ''; 
        this.tile.classList.add('tile');
        if (this.number > 0) {
            this.tile.innerText = this.number.toString();
          if (this.number <= 4096) {
            this.tile.classList.add(`x${this.number.toString()}`);
          } else {
            this.tile.classList.add('x8192');
          }
        }
      }

      setTwo() {
        if (!this.hasEmptyTile()) {
          return;
        }
        this.found = false;
        while (!this.found) {
          this.randomRow = Math.floor(Math.random() * this.rows);
          this.randomColumn = Math.floor(Math.random() * this.columns);
          if (this.board[this.randomRow][this.randomColumn] === 0) {
            this.board[this.randomRow][this.randomColumn] = 2;
            this.tile = document.getElementById(this.randomRow.toString() + "-" + this.randomColumn.toString());
            this.tile.innerText = '2';
            this.tile.classList.add('x2');
            this.found = true;
          }
        }
      }
      
      hasEmptyTile() {
        for (let row = 0; row < this.rows; row++) {
          for (let column = 0; column < this.columns; column++) {
            if (this.board[row][column] === 0) {
              return true;
            }
          }
        }
        return false;
      }
}
