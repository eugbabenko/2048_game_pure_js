export default class Model {
  constructor() {
    this.board = [];
    this.history = [];
    this.score = 0;
    this.rows = 4;
    this.columns = 4;
  }

  getRows() {
    return this.rows;
  }

  getColumns() {
    return this.columns;
  }

  getBoard() {
    return this.board;
  }

  setBoard(board) {
    this.board = board;
  }

  setBoardRow(row, value) {
    this.board[row] = value;
  }

  setScore(score) {
    if (!score) this.score = 0;
    this.score += score;
  }

  getScore() {
    return this.score;
  }

  getHistory() {
    return this.history;
  }

  setHistory(history) {
    this.history.push([new Date().toDateString(), history]);
  }
}
