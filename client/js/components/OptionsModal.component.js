import { createComponent } from "./create-component.js";

class OptionsModal extends HTMLElement {

  css() {
    return `
      .modal--container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: 1000;
        background-color: rgba(1,1,1,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .modal--container .modal {
        background-color: silver;
        width: 250px;
        display: flex;
        flex-direction: column;
        padding: 8px;
        box-shadow: 5px 5px 1px rgb(1 1 1 / 50%);
      }
      
      .modal--header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
      }
      
      .modal--body  {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
      }
      
      .modal--body label {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        font-family: sans-serif;
        line-height: 30px;
      }
      
      .modal--body label input {
        padding: 8px;
        font-size: 18px;
      }
      
      .modal--body button {
        padding: 20px 8px;
        cursor: pointer;
      }
      
      .modal--footer {}
    `;
  }

  html() {
    return `
      <div class="modal--container">
        <div class="modal">
          <div class="modal--header">
            <button style="cursor: pointer;">x</button>
          </div>
          <form class="modal--body">
            <label>Width: <input name="width" value="10" type="number"></label>
            <label>Height: <input name="height" value="10" type="number"></label>
            <label>Mine Count: <input name="mineCount" value="5" type="number"></label>
            <button>Start Game</button>
            </form>
          <div class="modal--footer"></div>
        </div>
      </div>
    `;
  }

  onRender() {
    const form = this.shadowRoot.querySelector('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const numberInputs = e.target.querySelectorAll('input[type="number"]');
      const valueList = Array.from(numberInputs).map(e => ({ name: e.name, value: e.value }));
      const values = valueList.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});

      const startEvent = new CustomEvent('minesweeper-start', { detail: values });
      this.dispatchEvent(startEvent);
    });

    const closeButton = this.shadowRoot.querySelector('.modal--header button');
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      const menuCloseEvent = new CustomEvent('minesweeper-menu-close');
      this.dispatchEvent(menuCloseEvent);
    })
  }
}

export const OptionsModalComponent = createComponent('minesweeper-options', OptionsModal);