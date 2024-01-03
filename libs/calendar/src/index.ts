import { LitElement, css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
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
} from 'date-fns';

@customElement('aberto-calendar')
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

  static override styles = css`
    table {
      width: 100%;
      border: 1px solid;
    }

    th {
      border: 1px solid;
    }

    td {
      border: 1px solid;
    }
  `;

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
    console.log('jani', this.monthEnd, dayOfWeek);
    if (dayOfWeek === 7) {
      return [];
    }

    return eachDayOfInterval({
      start: addDays(this.monthEnd, 1),
      end: endOfWeek(this.monthEnd),
    });
  }

  override render() {
    console.log('all', this.allDaysInMonth);
    console.log('previous', this.daysFromPreviousMonth);
    console.log('next', this.daysFromNextMonth);

    return html`
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aberto-calendar': Calendar;
  }
}
