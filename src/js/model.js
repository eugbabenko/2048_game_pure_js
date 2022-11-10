export default class Model {
    constructor (){ 
        this.board = [];
        this.score = 0;
        this.rows = 4;
        this.columns = 4;
    }

    hasEmptyTile () {
        for (let r = 0; r < this.rows; r++) {
          for (let c = 0; c < this.columns; c++) {
            if (this.board[r][c] === 0) {
              // at least one zero in the board
              return true;
            }
          }
        }
        return false;
      }
}