export enum SearchType {
  FACEBOOK = 'FACEBOOK',
  VKONTAKTE = 'VKONTAKTE',
  LINKEDIN = 'LINKEDIN',
  INSTAGRAM = 'INSTAGRAM',
  WHATSAPP = 'WHATSAPP',
  VIBER = 'VIBER',
  TELEGRAM = 'TELEGRAM',
}

export enum SearchVariant {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
  BACKGROUND = 'BACKGROUND',
}

export enum SearchParsingStatus {
  NEW = 'NEW',
  PARSING = 'PARSING',
  TRACKED = 'TRACKED',
  STOPPED = 'STOPPED',
  ADMIN_RESTRICTED_THE_ACCESS = 'ADMIN_RESTRICTED_THE_ACCESS',
}

export type ParsingStatus = EnumLiteralsOf<typeof ParsingStatus>;
export const ParsingStatus = Object.freeze({
  NEW: 'NEW' as 'NEW',
  TRACKED: 'TRACKED' as 'TRACKED',
  PARSING: 'PARSING' as 'PARSING',
  STOPPED: 'STOPPED' as 'STOPPED',
  ADMIN_RESTRICTED_THE_ACCESS: 'ADMIN_RESTRICTED_THE_ACCESS' as 'ADMIN_RESTRICTED_THE_ACCESS',
  BACKGROUND: 'BACKGROUND' as 'BACKGROUND',
});

export type SearchActionButtonType = EnumLiteralsOf<
  typeof SearchActionButtonType
>;
export const SearchActionButtonType = Object.freeze({
  STOP: 'STOP' as 'STOP',
  PARSE: 'PARSE' as 'PARSE',
  DELETE: 'DELETE' as 'DELETE',
  REFRESH: 'REFRESH' as 'REFRESH',
});

export type MessagePaginationType = EnumLiteralsOf<
  typeof MessagePaginationType
>;
export const MessagePaginationType = Object.freeze({
  INITIAL: 'INITIAL' as 'INITIAL',
  NEXT: 'NEXT' as 'NEXT',
  PREVIOUS: 'PREVIOUS' as 'PREVIOUS',
  FIRST: 'FIRST' as 'FIRST',
  LAST: 'LAST' as 'LAST',
  SCROLL_UP: 'SCROLL_UP' as 'SCROLL_UP',
  SCROLL_DOWN: 'SCROLL_DOWN' as 'SCROLL_DOWN',
});
