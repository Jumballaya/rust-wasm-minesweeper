
export const createComponent = (selector, ctor) => {

  const onRender = ctor.prototype.onRender || function() {};
  ctor.prototype.onRender = function() {
    const $template = document.createElement('template');
    const styleBlock = `<style>${this.css ? this.css() : ''}</style>`;
    const innerHTML = `${styleBlock}${this.html ? this.html() : ''}`;
    $template.innerHTML = innerHTML;
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild($template.content);
    onRender.bind(this)();
  }
  
  const connectedCallback = ctor.prototype.connectedCallback || function() {};
  ctor.prototype.connectedCallback = function() {
    const attributes = this.attributes || [];

    const observer = new MutationObserver((mutations) => {
      const changedAttrs = mutations.map(m => m.attributeName);
      const shouldUpdate = changedAttrs.some(ca => attributes.some(a => a === ca));
      if (shouldUpdate) {
        this.onRender();
      }
    });
    observer.observe(this, { attributes: true });

    const $template = document.createElement('template');
    const styleBlock = `<style>${this.css ? this.css() : ''}</style>`;
    const innerHTML = `${styleBlock}${this.html ? this.html() : ''}`;
    $template.innerHTML = innerHTML;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild($template.content);
    connectedCallback.bind(this)();
    this.onRender();
  }

  window.customElements.define(selector, ctor);
}