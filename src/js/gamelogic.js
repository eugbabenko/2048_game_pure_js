import DOM from "./dom.js"
const dom = new DOM(4, 4)

export default class GameLogic {
  constructor() {
    this.board = dom.board
    this.rows = 4;
    this.columns = 4;
    this.score = 0;
    
  }

  filterZero(row) {
    console.log(row)
    return row.filter((number) => number !== 0);
  }

  slide(row) {
    this.row = this.filterZero(row);
    for (let i = 0; i < this.row.length - 1; i++) {
      if (this.row[i] === this.row[i + 1]) {
        this.row[i] *= 2;
        this.row[i + 1] = 0;
        this.score += this.row[i];
      }
    } 
    this.row = this.filterZero(row); 
    while (this.row.length < this.columns) {
      this.row.push(0);
    } 
    return this.row;
  }

  slideLeft() {
    for (let row = 0; row < this.rows; row++) {
      this.rowNumber = this.board[row];
      this.rowNumber = this.slide(this.rowNumber);
      this.board[row] = this.rowNumber;
      for (let column = 0; column < this.columns; column++) {
        this.tile = document.getElementById(
          row.toString() + '-' + column.toString()
        );
        this.number = this.board[row][column];
        dom.updateTile(this.tile, this.number);
      }
    }
  }

  slideRight() {
    for (let row = 0; row < this.rows; row++) {
      this.rowNumber = this.board[row];
      this.rowNumber.reverse(); 
      this.rowNumber = this.slide(row); 
      this.board[row] = this.rowNumber.reverse(); 
      for (let column = 0; column < this.columns; column++) {
        this.tile = document.getElementById(
          row.toString() + '-' + column.toString()
        );
        this.number = this.board[row][column];
        dom.updateTile(this.tile, this.number);
      }
    }
  }

  slideUp() {
    for (let column = 0; column < this.columns; column++) {
      this.rowNumber = [
        this.board[0][column],
        this.board[1][column],
        this.board[2][column],
        this.board[3][column],
      ];
      this.rowNumber = this.slide(this.rowNumber);
      for (let row = 0; row < this.rows; row++) {
        this.board[row][column] = this.rowNumber[row];
        this.tile = document.getElementById(
          row.toString() + '-' + column.toString()
        );
        this.number = this.board[row][column];
        dom.updateTile(this.tile, this.number);
      }
    }
  }

  slideDown() {
    for (let column = 0; column < this.columns; column++) {
      this.rowNumber = [
        this.board[0][column],
        this.board[1][column],
        this.board[2][column],
        this.board[3][column],
      ];
      this.rowNumber.reverse();
      this.rowNumber = this.slide(this.rowNumber);
      this.rowNumber.reverse();
      for (let row = 0; row < this.rows; row++) {
        this.board[row][column] = this.rowNumber[row];
        this.tile = document.getElementById(
          row.toString() + '-' + column.toString()
        );
        this.number = this.board[row][column];
        dom.updateTile(this.tile, this.number);
      }
    }
  }
}
