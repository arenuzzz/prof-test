import {
  SearchVariant,
  SearchParsingStatus,
} from '@features/search/search.constants';
import {
  SearchType,
  MessagePaginationType,
  ParsingStatus,
} from './search.constants';

export type Country = {
  name: string;
  code: string;
  phoneCode: number;
};

export type TrueCallerData = {
  initials?: string;
  isExists: boolean;
};

export type SearchCountsParams = {
  phoneNumber?: string;
  country?: string;
  initials?: string;
  facebookLink?: string;
  vkontakteLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  telegramLink?: string;
  viberLink?: string;
  whatsupLink?: string;
  isBackground: boolean;
};

export type SearchParams = SearchCountsParams & {
  type: SearchType;
  page?: number;
  size?: number;
};

export type SearchAllCountsParams = Partial<SearchCountsParams>;

export type SearchProfilesCount = {
  type: SearchType;
  count: number;
  addedCount?: number;
  totalCount?: number;
};

export type SearchProfilesCountsData = SearchProfilesCount[];

export type ResultCard = {
  id: number | string;
  avatarLink?: string;
  birthDate?: string;
  city?: string;
  country?: string;
  initials: string;
  link: string;
  nickname?: string;
  phoneNumber?: string;
  type: SearchType;
  isBackground: boolean;
  isTracked?: boolean;
  messagesCount?: number;
};

export type SearchProfilesResultsData = {
  content: ResultCard[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type Location = {
  lat: string;
  lng: string;
};

export type SearchPlace = {
  country: string;
  city?: string;
};

export type ProfileCoordinates = {
  lat: string;
  lng: string;
};

export type SearchGroupsCountsParams = {
  name?: string;
  telegramLinks?: string[];
  viberLinks?: string[];
  whatsappLinks?: string[];
  searchType: SearchVariant.EXTERNAL | SearchVariant.INTERNAL;
};

export type SearchGroupsCountsData = SearchProfilesCount[];

export type SearchAllGroupsCountsParams = Partial<SearchGroupsCountsParams>;

export type MessengerType =
  | SearchType.WHATSAPP
  | SearchType.VIBER
  | SearchType.TELEGRAM
  | SearchType.INSTAGRAM;

export type SearchGroupsParams = SearchGroupsCountsParams & {
  type: MessengerType;
  page?: number;
  size?: number;
};

export type GroupResultCard = {
  id: number | string;
  name: string;
  parsingStatus: SearchParsingStatus;
  type: MessengerType;

  link?: string;
  avatarLink?: string;

  lastMessageDateTime?: string;
  totalMembersCount?: number;
  trackedMembersCount?: number;
  messagesCount?: number;
};

export type SearchGroupsResultsData = {
  content: GroupResultCard[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type SearchProfilesAutocompleteParams = {
  groupId: number;
  initialsParts: string;
  page?: number;
  size?: number;
};

export type SearchGroupMessagesCountParams = {
  keyword?: string;
  groupId: number;
  fromDate?: string;
  toDate?: string;
  profilesIds?: number[];
};

export type SearchGroupMessagesCountResultsData = number;

export type SearchGroupMessagesParams = SearchGroupMessagesCountParams & {
  currentMessageId?: number;
  pagination: MessagePaginationType;
};

export type MessagePosition = 'left' | 'right';

export type SearchGroupMessagesResultsData = {
  avatarLink: string;
  dateTime: string;
  id: number;
  initials: string;
  isHighlighted: true;
  message: string;
  nickname: string;
  phoneNumber: string;
  profileId: number;
  position?: MessagePosition;
};

export type SearchGroupSubheaderData = GroupResultCard & {
  firstMessageDateTime: string;
  lastMessageDateTime: string;
  unfreezeSendDateTime: string;
  lastSearchMessageDateTime: string;
};

export type SendMessageParams = {
  groupId: number;
  message: string;
};

export type SendMessageResultData = {
  message: string;
  dateTime: string;
  initials: string;
  isHighlighted: boolean;
  isAdmin: boolean;
  unfreezeSendDateTime: string;
  lastSearchMessageDateTime: string;
};
