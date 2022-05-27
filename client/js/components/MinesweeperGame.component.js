import { createComponent } from "./create-component.js";
import './OptionsModal.component.js';
import './MineField.component.js';

class MinesweeperGame extends HTMLElement {

  attributes = ['data', 'state'];

  get data() {
    return this.getAttribute('data');
  }

  set data(data) {
    this.setAttribute('data', JSON.stringify(data));
  }

  get state() {
    return this.getAttribute('state') || 'playing';
  }

  set state(state) {
    this.setAttribute('state', state);
  }

  onRender() {
    this.shadowRoot.querySelector('.button--smiley').addEventListener('click', () => {
      const msMenuEvent = new CustomEvent('minesweeper-menu', {});
      this.dispatchEvent(msMenuEvent);
    });

    const minefield = this.shadowRoot.querySelector('minesweeper-minefield');
    minefield.addEventListener('minesweeper-check-mine', (e) => {
      e.preventDefault();
      const checkMineEvent = new CustomEvent('minesweeper-check-mine', { detail: e.detail });
      this.dispatchEvent(checkMineEvent);
    });

    minefield.addEventListener('minesweeper-flag-mine', (e) => {
      e.preventDefault();
      const flagMineEvent = new CustomEvent('minesweeper-flag-mine', { detail: e.detail });
      this.dispatchEvent(flagMineEvent);
    });
  }

  css() {
    return `
      .game--container {
        display: inline-block;
        background-color: silver;
        padding: 8px;
        margin-top: 40px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
      }

      .game--header {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-gap: 12px;
        background-color: silver;
        padding: 12px;
      }
      
      .button--smiley {
        width: 48px;
        height: 48px;
        justify-self: center;
        background-size: cover;
        background-color: transparent;
      }
      
      .button--smiley.smiley-playing {
        background-image: url("../../client/assets/smiley-playing.png");
      }
      
      .button--smiley.smiley-lost {
        background-image: url("../../client/assets/smiley-lost.png");
      }
      
      .button--smiley.smiley-won {
        background-image: url("../../client/assets/smiley-won.png");
      }
    `;
  }

  html() {
    return `
      <div class="game--container">
        <div class="game--header">
          <div></div>
            <button class="button--smiley smiley-${this.state}"></button>
          <div></div>
        </div>
        <minesweeper-minefield data=${this.data}></minesweeper-minefield>
      </div>
    `
  }

}

export const MinesweeperGameComponent = createComponent('minesweeper-game', MinesweeperGame);