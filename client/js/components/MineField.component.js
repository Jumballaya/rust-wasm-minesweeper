import { createComponent } from "./create-component.js";

class MineField extends HTMLElement {

  attributes = ['data'];

  get data() {
    const dataString = this.getAttribute('data');
    return dataString ? JSON.parse(dataString) : [[]];
  }

  set data(data) {
    this.setAttribute('data', JSON.stringify(data));
  }

  onRender() {
    const gameBoard = this.shadowRoot.querySelector('.game--board');
    if (gameBoard) {
      const rows = this.data?.length || 10;
      const cols = this.data?.[0]?.length || 10;
      gameBoard.style.gridTemplate = `repeat(${rows}, 48px) / repeat(${cols}, 44px)`;

      for (const btn of gameBoard.querySelectorAll('.field-button')) {
        btn.addEventListener('click', e => {
          e.preventDefault();
          const x = btn.getAttribute('x');
          const y = btn.getAttribute('y');
          const event = new CustomEvent('minesweeper-check-mine', { detail: [x, y] });
          this.dispatchEvent(event);
        });
        btn.addEventListener('contextmenu', e => {
          e.preventDefault();
          const x = btn.getAttribute('x');
          const y = btn.getAttribute('y');
          const event = new CustomEvent('minesweeper-flag-mine', { detail: [x, y] });
          this.dispatchEvent(event);
        })
      }
    }
  }

  css() {
    return `
      .game--board {
        padding: 12px 0;
        display: grid;
      }

      .field-button {
        font-size: 20px;
        justify-content: center;
        align-items: center;
        display: flex;
        text-decoration: none;
        text-align: center;
        width: 44px;
        height: 48px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
        background-color: silver;
        cursor: pointer;
      }
      
      .field-button.empty {
        width: 44px;
        height: 48px;
      }
      
      .field-button.clicked {
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
      }
      
      .field-button:active {
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
      }
    `;
  }

  html() {
    return `
      <div class="game--board">
        ${this.#renderBoard()}
      </div>
    `;
  }

  #renderBoard() {
    const data = this.data;
    let markup = '';
    for (let y = 0; y < data?.length; y++) {
      for (let x = 0; x < data[0]?.length; x++) {
        const type = data[y][x];
        markup += this.#renderFieldButton(type, x, y);
      }
    }
    return markup;
  }

  #renderFieldButton(type, x, y) {
    if (type === '🟪') {
      return `<div x=${x} y=${y} class="field-button empty"></div>`;
    }
    if (type === '🚩') {
      return `<div x=${x} y=${y} class="field-button empty">${type}</div>`;
    }
    if (type === '0') {
      return `<div x=${x} y=${y} class="field-button clicked"></div>`;
    }
    return `<div x=${x} y=${y} class="field-button clicked">${type}</div>`;
  }

}

export const MineFieldComponent = createComponent('minesweeper-minefield', MineField);