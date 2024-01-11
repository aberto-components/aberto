import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDay,
  startOfMonth,
  startOfWeek,
  subDays,
  getDate as getAsDate,
  format as formatDate,
  parseISO as parseAsIso,
  subMonths,
  addMonths,
} from 'date-fns';

/**
 * A utilities class for the calendar component
 */
export class CalendarUtils {
  getHeadersForDaysInWeek() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  getStartOfMonth(date: Date) {
    return startOfMonth(date);
  }

  getEndOfMonth(date: Date) {
    return endOfMonth(date);
  }

  getAllDaysInMonth(date: Date) {
    return eachDayOfInterval({
      start: this.getStartOfMonth(date),
      end: this.getEndOfMonth(date),
    });
  }

  getDaysFromPreviousMonth(date: Date) {
    const startOfMonth = this.getStartOfMonth(date);
    const dayOfWeek = getDay(startOfMonth);
    if (dayOfWeek === 0) {
      return [];
    }

    return eachDayOfInterval({
      start: startOfWeek(startOfMonth),
      end: subDays(startOfMonth, dayOfWeek),
    });
  }

  getDaysFromNextMonth(date: Date) {
    const endOfMonth = this.getEndOfMonth(date);
    const dayOfWeek = getDay(endOfMonth);
    if (dayOfWeek === 7) {
      return [];
    }

    return eachDayOfInterval({
      start: addDays(endOfMonth, 1),
      end: endOfWeek(endOfMonth),
    });
  }

  getAllDaysInCalendarMonth(date: Date) {
    return [
      ...this.getDaysFromPreviousMonth(date),
      ...this.getAllDaysInMonth(date),
      ...this.getDaysFromNextMonth(date),
    ];
  }

  getPreviousMonthStart(date: Date) {
    const workingMonthStart = this.getStartOfMonth(date);
    return subMonths(workingMonthStart, 1);
  }

  getNextMonthStart(date: Date) {
    const workingMonthStart = this.getStartOfMonth(date);
    return addMonths(workingMonthStart, 1);
  }

  getDate(date: Date) {
    return getAsDate(date);
  }

  format(date: Date, formatString: string) {
    return formatDate(date, formatString);
  }

  parseISO(input: string) {
    return parseAsIso(input);
  }
}
