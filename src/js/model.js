const LOCAL_STORAGE_KEY = 'game_data';

export default class Model {
  constructor(localStorage) {
    this.localStorage = localStorage;
    const {board, history, score, bestScore} = this.getFromLocalStorage() || {};
    this.board = board || [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.history = history || [];
    this.score = score || 0;
    this.bestScore = bestScore || 0;
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
    this.saveToLocalStorage()
  }

  setScore(score) {
    if (!score) this.score = 0;
    this.score += score;
    this.saveToLocalStorage()
  }

  getScore() {
    return this.score;
  }

  setBestScore(score) {
    const bestScore = Math.max(...this.history.map((el) => el[1]));
    if (score < bestScore) return;
    this.bestScore = score;
    this.saveToLocalStorage()
  }

  getBestScore() {
    return this.bestScore;
  }

  getHistory() {
    return this.history;
  }

  setHistory(history) {
    this.history.push([new Date().toDateString(), history]);
    this.saveToLocalStorage()
  }

  saveToLocalStorage() {
    this.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      score: this.score,
      bestScore: this.bestScore,
      board: this.board,
      history: this.history,
    }))
  }

  getFromLocalStorage() { 
    const gameData = this.localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(gameData)
  }


}
