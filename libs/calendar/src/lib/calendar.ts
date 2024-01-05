import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  subDays,
  addDays,
  endOfWeek,
  getDay,
  getDate,
  format,
  parseISO,
  isValid,
} from 'date-fns';

import { calendarStyles } from './calendar-styles';

@customElement('wc-calendar')
class Calendar extends LitElement {
  private headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  private currentDate = new Date();
  private monthStart = startOfMonth(this.currentDate);
  private monthEnd = endOfMonth(this.currentDate);
  private allDaysInMonth = eachDayOfInterval({
    start: this.monthStart,
    end: this.monthEnd,
  });
  private daysFromPreviousMonth = this.getDaysFromPreviousMonth();
  private daysFromNextMonth = this.getDaysFromNextMonth();
  private allDays = [...this.daysFromPreviousMonth, ...this.allDaysInMonth, ...this.daysFromNextMonth];

  static override styles = [calendarStyles];

  @property({
    type: String,
    attribute: 'default-date',
    converter: (value) => {
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
  })
  defaultDate = format(new Date(), 'yyyy-MM-dd');

  constructor() {
    super();
    this.addEventListener('click', this.handleCalendarButtonClick);
  }

  private handleCalendarButtonClick(event: Event) {
    const componentName = (event.target as Element).localName;
    console.log('componentName', componentName);
  }

  private getDaysFromPreviousMonth() {
    const dayOfWeek = getDay(this.monthStart);
    if (dayOfWeek === 0) {
      return [];
    }

    return eachDayOfInterval({
      start: startOfWeek(this.monthStart),
      end: subDays(this.monthStart, dayOfWeek),
    });
  }

  private getDaysFromNextMonth() {
    const dayOfWeek = getDay(this.monthEnd);
    if (dayOfWeek === 7) {
      return [];
    }

    return eachDayOfInterval({
      start: addDays(this.monthEnd, 1),
      end: endOfWeek(this.monthEnd),
    });
  }

  override render() {
    console.log('date', this.defaultDate);
    return html`
      <div class="calendar-wrapper">
        <section class="calendar-toolbar">
          <div class="calendar-toolbar-element left">
            <slot name="toolbar-left"></slot>
          </div>
          <div class="calendar-toolbar-element center">
            <h2>${format(this.currentDate, 'MMMM yyyy')}</h2>
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
                ${this.allDays.slice(0, 7).map((day) => html`<td>${getDate(day)}</td>`)}
              </tr>
              <tr>
                ${this.allDays.slice(7, 14).map((day) => html`<td>${getDate(day)}</td>`)}
              </tr>
              <tr>
                ${this.allDays.slice(14, 21).map((day) => html`<td>${getDate(day)}</td>`)}
              </tr>
              <tr>
                ${this.allDays.slice(21, 28).map((day) => html`<td>${getDate(day)}</td>`)}
              </tr>
              ${this.allDays.length > 29
                ? html`<tr>
                    ${this.allDays.slice(28, 35).map((day) => html`<td>${getDate(day)}</td>`)}
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
