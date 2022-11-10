export default class Controller {
  constructor(model, dom) {
    this.model = model;
    this.dom = dom;
  }

  run() {
    this.dom.setGame();
    
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft') {
        this.slideLeft();
        this.dom.setTwo();
      } else if (e.code === 'ArrowRight') {
        this.slideRight();
        this.dom.setTwo();
      } else if (e.code === 'ArrowUp') {
        this.slideUp();
        this.dom.setTwo();
      } else if (e.code === 'ArrowDown') {
        this.slideDown();
        this.dom.setTwo();
      }
      document.getElementById('score').innerText = this.model.score;
    });

    document.querySelector('#restart-button').addEventListener('click', () => {
      const board = document.querySelector('#board');
      board.innerHTML = '';
      this.model.score = 0;
      this.dom.setGame();
    })
  }


  filterZero(row) {
    return row.filter((num) => num !== 0); // create new array of all nums != 0
  }

  slide(row) {
    this.row = this.filterZero(row); 
    for (let i = 0; i < this.row.length - 1; i++) {
      if (this.row[i] === this.row[i + 1]) {
        this.row[i] *= 2;
        this.row[i + 1] = 0;
        this.model.score += this.row[i];
      }
    } 
    this.row = this.filterZero(this.row); 
    while (this.row.length < this.model.columns) {
      this.row.push(0);
    } 
    return this.row;
  }

  slideLeft() {
    for (let r = 0; r < this.model.rows; r++) {
      this.row = this.slide(this.model.board[r]);
      this.model.board[r] = this.row;
      
      for (let c = 0; c < this.model.columns; c++) {
        this.tile = document.getElementById(`${r.toString()  }-${  c.toString()}`);
        this.num = this.model.board[r][c];
        this.dom.updateTile(this.tile, this.num);
      }
    }
  }

  slideRight() {
    for (let r = 0; r < this.model.rows; r++) {
      this.row = this.slide(this.model.board[r].reverse());
      this.model.board[r] = this.row.reverse();

      for (let c = 0; c < this.model.columns; c++) {
        this.tile = document.getElementById(`${r.toString()  }-${  c.toString()}`);
        this.num = this.model.board[r][c];
        this.dom.updateTile(this.tile, this.num);
      }
    }
  }

  slideUp() {
    for (let c = 0; c < this.model.columns; c++) {
      this.row = this.slide([
        this.model.board[0][c],
        this.model.board[1][c],
        this.model.board[2][c],
        this.model.board[3][c],
      ]);

      for (let r = 0; r < this.model.rows; r++) {
        this.model.board[r][c] = this.row[r];
        this.tile = document.getElementById(`${r.toString()  }-${  c.toString()}`);
        this.num = this.model.board[r][c];
        this.dom.updateTile(this.tile, this.num);
      }
    }
  }

  slideDown() {
    for (let c = 0; c < this.model.columns; c++) {
      this.row = this.slide(
        [
          this.model.board[0][c],
          this.model.board[1][c],
          this.model.board[2][c],
          this.model.board[3][c],
        ].reverse()
      ).reverse();

      for (let r = 0; r < this.model.rows; r++) {
        this.model.board[r][c] = this.row[r];
        this.tile = document.getElementById(`${r.toString()  }-${  c.toString()}`);
        this.num = this.model.board[r][c];
        this.dom.updateTile(this.tile, this.num);
      }
    }
  }
}