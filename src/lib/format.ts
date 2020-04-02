import {
  telegramReplacerRegex,
  instagramReplacerRegex,
} from './validation/matches';
import formatString from 'format-string-by-pattern';

export const secureCodeMask = '41217a20-a412-4272-8519-817775ce4a23';

export function formatPhoneInputValue(value) {
  let inputValue = value;

  if (value) {
    const prefix = value.startsWith('+') ? '' : '+';

    inputValue = `${prefix}${value}`.replace(/[^0-9+]/gm, '');
  }

  return inputValue;
}

export function formatValue(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value
      .toString()
      .replace(/^\s+|\s+$/gm, '')
      .replace(/\s+/gm, ' ');
  }

  return value;
}

export function formatLinkValue(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return (
      value
        .toString()
        // .replace(/^\s+|\s+$/gm, '')
        .replace(/\s/gm, '')
    );
  }

  return value;
}

export function formatTelegramValue(value) {
  if (!value) {
    return '@';
  }

  if (typeof value === 'string') {
    const prefix = value.startsWith('@') ? '' : '@';
    const username = `${prefix}${value}`;

    return formatValue(username).replace(telegramReplacerRegex, '');
  }

  return value;
}

export function formatInstagramValue(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return formatValue(value).replace(instagramReplacerRegex, '');
  }

  return value;
}

export { formatString };
