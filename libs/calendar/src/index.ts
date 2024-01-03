import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('aberto-calendar')
class Calendar extends LitElement {
  override render() {
    return html`<div>Skjer det noe, eller shape det?</div>
      <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aberto-calendar': Calendar;
  }
}
