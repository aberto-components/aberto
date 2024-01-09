// LIT ELEMENT FOR RENDERING SVG ICONS

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import RawIcon from '../icons';

declare global {
  interface HTMLElementTagNameMap {
    'wc-svg-icon': SvgIcon;
  }
}

export type IconNames = keyof typeof RawIcon;

@customElement('wc-svg-icon')
class SvgIcon extends LitElement {
  @property({ type: String }) icon: IconNames = 'sort';
  @property({ type: String }) color = 'currentColor';
  @property({ type: Number }) width = 24;
  @property({ type: Number }) height = 24;

  private getIconString() {
    return RawIcon[this.icon];
  }

  private getIconSVGElement(): SVGElement | null {
    const iconString = this.getIconString();

    if (!iconString) {
      console.error('Icon string is null or undefined.');
      return null;
    }

    const decodedIconString = decodeURIComponent(iconString);
    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedIconString, 'image/svg+xml');

    if (!doc || doc.documentElement.nodeName === 'parsererror') {
      console.error('Error parsing SVG string:', decodedIconString);
      return null;
    }

    const container = document.createElement('div');
    container.innerHTML = decodedIconString;

    // Ensure the container has a single child (the SVG element)
    if (container.children.length !== 1 || container.firstElementChild!.tagName.toLowerCase() !== 'svg') {
      console.error('Invalid SVG structure:', decodedIconString);
      return null;
    }

    return container.firstElementChild as SVGElement;
  }

  override render() {
    if (!this.icon) {
      return html``;
    }

    return html` ${this.getIconSVGElement()} `;
  }
}
