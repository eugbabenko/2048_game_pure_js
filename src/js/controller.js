export default class Controller {
  constructor(model, dom) {
    this.model = model;
    this.dom = dom;
  }

  initGame() {
    const audio = this.dom.getElementByID('audio');
 
    this.dom.getDocument().addEventListener('keyup', (e) => {
      audio.play();
      if (e.code === 'ArrowLeft') {
        this.slideLeft();
      } else if (e.code === 'ArrowRight') {
        this.slideRight();
      } else if (e.code === 'ArrowUp') {
        this.slideUp();
      } else if (e.code === 'ArrowDown') {
        this.slideDown();
      }
      this.setNumberTwoOnBoard();
    });

    this.dom.addListener('#restart-button', 'click', () => this.startNewGame());
  }

  run() {
      this.model.notifyObserver();
  }

  filterZero(row) {
    return row.filter((num) => num !== 0); // create new array of all nums != 0
  }

  startNewGame() {
    this.dom.getElementBySelector('#board').innerHTML = '';
    this.dom.getElementBySelector('#score').innerHTML = 0;
    this.model.setHistory(this.model.getScore());
    this.model.setScore(0);
    this.model.setBoard([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    this.run();
    this.setNumberTwoOnBoard();
    this.setNumberTwoOnBoard();
  }

  setNumberTwoOnBoard() {
    if (!this.checkHasEmptyTile()) {
      this.checkEndOfGame();
      return;
    }
    let found = false;
    while (!found) {
      // find random row and column to place a 2 in
      const row = Math.floor(Math.random() * this.model.getRows());
      const column = Math.floor(Math.random() * this.model.getColumns());
      const board = this.model.getBoard();
      if (board[row][column] === 0) {
        board[row][column] = 2;
        this.model.setBoard(board);
        found = true;
      }
    }
  }

  checkHasEmptyTile() {
    for (let r = 0; r < this.model.getRows(); r++) {
      for (let c = 0; c < this.model.getColumns(); c++) {
        if (this.model.getBoard()[r][c] === 0) {
          // at least one zero in the board
          return true;
        }
      }
    }
    return false;
  }

  slide(row) {
    this.row = this.filterZero(row);
    for (let i = 0; i < this.row.length - 1; i++) {
      if (this.row[i] === this.row[i + 1]) {
        this.row[i] *= 2;
        this.row[i + 1] = 0;
        this.model.setScore(this.row[i]);
        this.model.setBestScore(this.model.getScore());
      }
    }
    this.row = this.filterZero(this.row);
    while (this.row.length < this.model.getColumns()) {
      this.row.push(0);
    }
    return this.row;
  }

  slideLeft() {
    for (let r = 0; r < this.model.getRows(); r++) {
      const board = this.model.getBoard();
      const row = this.slide(board[r]);
      board[r] = row;
      this.model.setBoard(board);
    }
  }

  slideRight() {
    for (let r = 0; r < this.model.getRows(); r++) {
      const board = this.model.getBoard();
      const row = this.slide(board[r].reverse());
      board[r] = row.reverse();
      this.model.setBoard(board);
    }
  }

  slideUp() {
    for (let c = 0; c < this.model.getColumns(); c++) {
      const board = this.model.getBoard();
      const row = this.slide([
        board[0][c],
        board[1][c],
        board[2][c],
        board[3][c],
      ]);

      for (let r = 0; r < this.model.getRows(); r++) {
        board[r][c] = row[r];
      }
      this.model.setBoard(board);
    }
  }

  slideDown() {
    for (let c = 0; c < this.model.getColumns(); c++) {
      const board = this.model.getBoard();
      const row = this.slide(
        [board[0][c], board[1][c], board[2][c], board[3][c]].reverse()
      ).reverse();
      for (let r = 0; r < this.model.getRows(); r++) {
        board[r][c] = row[r];
      }
      this.model.setBoard(board);
    }
  }

  checkEndOfGame() {
    // First step: checking for the same value vertically
    let isOver = true;
    const board = this.model.getBoard();
    for (let j = 0; j < this.model.getRows(); j++) {
      for (let i = 0; i < this.model.getRows() - 1; i++) {
        const currentTile = board[i][j];
        const nextTile = board[i+1][j];
        if (currentTile === nextTile) {
          isOver = false;
          break;
        }
      }
    }

    // Second step: checking for the same value horizontally
    if (isOver) {
      for (let i = 0; i < this.model.getRows(); i++) {
        for (let j = 0; j < this.model.getRows() - 1; j++) {
          const currentTile = board[i][j];
          const nextTile = board[i][j + 1];
          if (currentTile === nextTile) {
            isOver = false;
            break;
          }
        }
      }
    }
    if (isOver) {
      alert('Game over!');
      this.startNewGame();
    }
    return false;
  }
}
