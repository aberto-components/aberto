import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { calendarStyles } from './calendar-styles';
import { CalendarUtils } from '@/utils';
import { isValid, parseISO } from 'date-fns';

@customElement('wc-calendar')
class Calendar extends LitElement {
  private utils: CalendarUtils;
  private headers: string[] = [];

  static override styles = [calendarStyles];

  @property({
    type: Date,
    attribute: 'default-date',
    converter: {
      fromAttribute: (value) => {
        if (value) {
          const parsed = parseISO(value);
          const valid = isValid(parsed);
          if (!valid) {
            console.warn("The provided default-date is not a valid date! Date needs to be in the format 'yyyy-MM-dd'");
          }

          return parsed;
        }

        return value;
      },
    },
  })
  defaultDate = new Date();

  @state()
  protected _currentDate: Date;

  @state()
  protected _daysInMonth: Date[] = [];

  constructor() {
    super();

    this._currentDate = this.defaultDate;

    this.utils = new CalendarUtils();
    this.headers = this.utils.getHeadersForDaysInWeek();
    this._daysInMonth = this.utils.getAllDaysInCalendarMonth(this._currentDate);

    this.addEventListener('click', this.handleCalendarButtonClick);
  }

  private gotoPreviousMonth() {
    const previousMonthStart = this.utils.getPreviousMonthStart(this._currentDate);
    this._currentDate = previousMonthStart;
    this._daysInMonth = this.utils.getAllDaysInCalendarMonth(this._currentDate);
  }

  private gotoNextMonth() {
    const nextMonthStart = this.utils.getNextMonthStart(this._currentDate);
    this._currentDate = nextMonthStart;
    this._daysInMonth = this.utils.getAllDaysInCalendarMonth(this._currentDate);
  }

  private handleCalendarButtonClick(event: Event) {
    const componentName = (event.target as Element).localName;
    switch (componentName) {
      case 'wc-calendar-previous-month-button': {
        this.gotoPreviousMonth();
        break;
      }
      case 'wc-calendar-next-month-button': {
        this.gotoNextMonth();
        break;
      }
      default: {
        return;
      }
    }
  }

  override render() {
    return html`
      <div class="calendar-wrapper">
        <section class="calendar-toolbar">
          <div class="calendar-toolbar-element left">
            <slot name="toolbar-left"></slot>
          </div>
          <div class="calendar-toolbar-element center">
            <h2>${this.utils.format(this._currentDate, 'MMMM yyyy')}</h2>
          </div>
          <div class="calendar-toolbar-element right">
            <slot name="toolbar-right"></slot>
          </div>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                ${this.headers.map((header) => html`<th>${header}</th>`)}
              </tr>
            </thead>
            <tbody>
              <tr>
                ${this._daysInMonth.slice(0, 7).map((day) => html`<td>${this.utils.getDate(day)}</td>`)}
              </tr>
              <tr>
                ${this._daysInMonth.slice(7, 14).map((day) => html`<td>${this.utils.getDate(day)}</td>`)}
              </tr>
              <tr>
                ${this._daysInMonth.slice(14, 21).map((day) => html`<td>${this.utils.getDate(day)}</td>`)}
              </tr>
              <tr>
                ${this._daysInMonth.slice(21, 28).map((day) => html`<td>${this.utils.getDate(day)}</td>`)}
              </tr>
              ${this._daysInMonth.length > 29
                ? html`<tr>
                    ${this._daysInMonth.slice(28, 35).map((day) => html`<td>${this.utils.getDate(day)}</td>`)}
                  </tr>`
                : nothing}
            </tbody>
          </table>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-calendar': Calendar;
  }
}
