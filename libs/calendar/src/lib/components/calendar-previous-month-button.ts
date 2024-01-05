import { customElement } from 'lit/decorators.js';

import { CalendarButtonMixin } from '@/mixins';

@customElement('wc-calendar-previous-month-button')
class CalendarPreviousMonthButton extends CalendarButtonMixin {
  override render() {
    return this.renderButton();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-calendar-previous-month-button': CalendarPreviousMonthButton;
  }
}
