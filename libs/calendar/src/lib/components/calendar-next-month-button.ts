import { customElement } from 'lit/decorators.js';

import { CalendarButtonMixin } from '@/mixins';

@customElement('wc-calendar-next-month-button')
class CalendarPreviousMonthButton extends CalendarButtonMixin {
  override render() {
    return this.renderButton();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-calendar-next-month-button': CalendarPreviousMonthButton;
  }
}
