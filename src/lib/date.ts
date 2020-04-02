import parse from 'date-fns/parse';
import format from 'date-fns/format';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

export const ISO_DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export function diffInMs(fromDate: Date, toDate: Date): number {
  return differenceInMilliseconds(fromDate, toDate);
}

export function parseISODateTime(dateTimeStr: string): Date {
  return parse(dateTimeStr, ISO_DATE_TIME_FORMAT, new Date());
}

export function getISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatMessageDateTime(dateTimeStr: string): string {
  return format(parseISODateTime(dateTimeStr), 'dd.MM.yy / HH:mm');
}

export function formatLastMessageDateTime(dateTimeStr: string): string {
  return format(parseISODateTime(dateTimeStr), `dd.MM.yy;  HH:mm:ss`);
}
