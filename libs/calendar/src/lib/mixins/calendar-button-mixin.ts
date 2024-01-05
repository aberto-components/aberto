import { LitElement, html } from 'lit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export declare class CalendarButtonMixinInterface {
  renderButton(): unknown;
}

const ButtonMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class CalendarButtonMixinClass extends superClass {
    renderButton() {
      return html`<button><slot></slot></button>`;
    }
  }

  return CalendarButtonMixinClass as Constructor<CalendarButtonMixinInterface> & T;
};

export const CalendarButtonMixin = ButtonMixin(LitElement);
