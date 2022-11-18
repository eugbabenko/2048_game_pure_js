export default class Controller {
  constructor(view, model, dom) {
    this.view = view;
    this.model = model;
    this.dom = dom;
  }

  initGame() {
    // subscribe to click
    this.dom.getDocument().addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft') {
        this.slideLeft();
        this.setNumberTwoOnBoard();
      } else if (e.code === 'ArrowRight') {
        this.slideRight();
        this.setNumberTwoOnBoard();
      } else if (e.code === 'ArrowUp') {
        this.slideUp();
        this.setNumberTwoOnBoard();
      } else if (e.code === 'ArrowDown') {
        this.slideDown();
        this.setNumberTwoOnBoard();
      }
      this.view.displayScore();
    });

    this.dom.addListener('#restart-button', 'click', () => {
      this.dom.getElementBySelector('#board').innerHTML = '';
      this.dom.getElementBySelector('#score').innerHTML = 0;
      this.model.setHistory(this.model.getScore());
      this.view.displayHistory();
      this.model.setScore(false);
      this.startNewGame();
    });

    // this.dom.addListener(..., this.onClick)
    // in callback
  }

  run() {
    this.startNewGame();
  }

  filterZero(row) {
    return row.filter((num) => num !== 0); // create new array of all nums != 0
  }

  startNewGame() {
    this.model.setBoard([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    this.view.displayBoard(
      this.model.getBoard(),
      this.model.getRows(),
      this.model.getColumns()
    );

    this.setNumberTwoOnBoard();
    this.setNumberTwoOnBoard();
  }

  setNumberTwoOnBoard() {
    if (!this.checkHasEmptyTile()) {
      return;
    }
    let found = false;
    while (!found) {
      // find random row and column to place a 2 in
      const row = Math.floor(Math.random() * this.model.getRows());
      const column = Math.floor(Math.random() * this.model.getColumns());
      if (this.model.getBoard()[row][column] === 0) {
        this.model.getBoard()[row][column] = 2;
        const tile = this.dom.getElementByID(
          `${row.toString()}-${column.toString()}`
        );
        tile.innerText = '2';
        tile.classList.add('x2');
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
      const row = this.slide(this.model.getBoard()[r]);
      this.model.setBoardRow(r, row);

      for (let c = 0; c < this.model.getColumns(); c++) {
        const tile = this.dom.getElementByID(`${r.toString()}-${c.toString()}`);
        const num = this.model.getBoard()[r][c];
        this.view.displayTile(tile, num);
      }
    }
  }

  slideRight() {
    for (let r = 0; r < this.model.getRows(); r++) {
      const row = this.slide(this.model.getBoard()[r].reverse());
      this.model.setBoardRow(r, row.reverse());

      for (let c = 0; c < this.model.getColumns(); c++) {
        const tile = this.dom.getElementByID(`${r.toString()}-${c.toString()}`);
        const num = this.model.getBoard()[r][c];
        this.view.displayTile(tile, num);
      }
    }
  }

  slideUp() {
    for (let c = 0; c < this.model.getColumns(); c++) {
      const row = this.slide([
        this.model.getBoard()[0][c],
        this.model.getBoard()[1][c],
        this.model.getBoard()[2][c],
        this.model.getBoard()[3][c],
      ]);

      for (let r = 0; r < this.model.getRows(); r++) {
        this.model.getBoard()[r][c] = row[r];
        const tile = this.dom.getElementByID(`${r.toString()}-${c.toString()}`);
        const num = this.model.getBoard()[r][c];
        this.view.displayTile(tile, num);
      }
    }
  }

  slideDown() {
    for (let c = 0; c < this.model.getColumns(); c++) {
      const row = this.slide(
        [
          this.model.getBoard()[0][c],
          this.model.getBoard()[1][c],
          this.model.getBoard()[2][c],
          this.model.getBoard()[3][c],
        ].reverse()
      ).reverse();

      for (let r = 0; r < this.model.getRows(); r++) {
        this.model.getBoard()[r][c] = row[r];
        const tile = this.dom.getElementByID(`${r.toString()}-${c.toString()}`);
        const num = this.model.getBoard()[r][c];
        this.view.displayTile(tile, num);
      }
    }
  }

  checkEndOfGame() {}

  onClick() {
    // call methods right, left, up, top, checkEndOfGame
    // calculate new board
    // call this.model.setBoard()
    // call this.view.displayBoard()
    // call this.view.displayScore()
    // call this.view.displayHistory()
  }
}
