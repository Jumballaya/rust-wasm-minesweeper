export class MineSweeperGame {

  gameElement = null;
  modalElement = null;

  constructor(rootSelector, engine) {
    this.engine = engine;
    this.$root = document.body.querySelector(rootSelector);
    if (!this.$root) {
      throw new Error(`No root element with selector "${root}" exists`);
    }
    if (this.gameElement === null) {
      this.#createGame();
      this.$root.appendChild(this.gameElement);
    }
    if (this.modalElement === null) this.#createModal();
  }

  #createGame() {
    this.gameElement = document.createElement('minesweeper-game');
    this.gameElement.data = this.engine.getData();
    this.gameElement.addEventListener('minesweeper-check-mine', (e) => {
      const [x, y] = e.detail;
      this.#openField(x, y);
    });

    this.gameElement.addEventListener('minesweeper-flag-mine', (e) => {
      const [x, y] = e.detail;
      this.#flagField(x, y);
    });

    this.gameElement.addEventListener('minesweeper-menu', () => {
      this.#createModal();
      this.$root.prepend(this.modalElement);
    });
  }

  #createModal() {
    this.modalElement = document.createElement('minesweeper-options');
    this.modalElement.addEventListener('minesweeper-start', (e) => {
      const { width, height, mineCount } = e.detail;
      this.engine.newGame(width, height, mineCount);
      this.$root.removeChild(this.modalElement);
      this.#render();
    });

    this.modalElement.addEventListener('minesweeper-menu-close', () => {
      this.$root.removeChild(this.modalElement);
    });
  }

  #openField(x, y) {
    this.engine.openField(x, y);
    this.#render();
  }

  #flagField(x, y) {
    this.engine.flagField(x, y);
    this.#render();
  }

  #render() {
    this.gameElement.data = this.engine.getData();
    this.gameElement.state = this.engine.getState();
  }

}