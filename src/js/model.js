export default class Model {
  constructor() {
    this.board = [];
    this.history = [];
    this.score = 0;
    this.bestScore = 0;
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

  setScore(score) {
    if (!score) this.score = 0;
    this.score += score;
  }

  getScore() {
    return this.score;
  }

  setBestScore(score) {
    const bestScore = Math.max(...this.history.map((el) => el[1]));
    if (score < bestScore) return;
    this.bestScore = score;
  }

  getBestScore() {
    return this.bestScore;
  }

  getHistory() {
    return this.history;
  }

  setHistory(history) {
    this.history.push([new Date().toDateString(), history]);
  }
}
