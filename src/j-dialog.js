import {StylableMixin} from './stylable-mixin.js';
import bemToShadow from './bem-to-shadow.js';
import TeleportingElement from './teleporting-element.js';
import style from './styles/dialog-style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      z-index: var(--j-dialog-z-index, 100);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
  ${ bemToShadow(style, '.j-dialog') }
  <slot></slot>
`;

export class JDialog extends StylableMixin(TeleportingElement) {
  connectedCallback() {
    if (this._isPlaceholder) return;

    super.connectedCallback();

    if (!this.__jdialogTemplateStamped) {
      if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
        ShadyCSS.prepareTemplate(template, this.nodeName.toLowerCase());
        ShadyCSS.styleElement(this);
      }

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.__jdialogTemplateStamped = true;
    }
  }
}

window.customElements.define('j-dialog', JDialog);
