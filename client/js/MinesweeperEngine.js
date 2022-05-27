import init, * as minesweeper from '../../pkg/minesweeper.js';

class MinesweeperEngine {

  #minesweeper = null;

  async init() {
    await init();
    this.#minesweeper = minesweeper;
    return this;
  }

  getData() {
    const state = this.#minesweeper.getState();
    const data = state.split('\n').map(row => row.trim().split(/\s+/)).filter(row => row.length > 1);
    return data;
  }

  getState() {
    if (this.hasWon()) return 'won';
    if (this.hasLost()) return 'lost';
    return 'playing';
  }

  newGame(w, h, mc) {
    this.#minesweeper.newGame(w, h, mc);
  }

  openField(x, y) {
    this.#minesweeper.openField(x,  y);
  }

  flagField(x, y) {
    this.#minesweeper.flagField(x, y);
  }

  hasWon() {
    return this.#minesweeper.checkWin();
  }

  hasLost() {
    return this.#minesweeper.checkLost();
  }
}

export const minesweeperEngine = new MinesweeperEngine();