import { AxiosStatic, AxiosInstance } from 'axios';
import {
  SignInValues,
  SignUpValues,
  UserData,
  TokenData,
  CheckEmailData,
  CompanyPermissions,
} from '@features/auth/auth.types';
import {
  Country,
  TrueCallerData,
  SearchParams,
  SearchProfilesResultsData,
  SearchProfilesCountsData,
  SearchAllCountsParams,
  SearchCountsParams,
  ResultCard,
  SearchGroupSubheaderData,
  SearchPlace,
  ProfileCoordinates,
  SearchGroupsResultsData,
  SearchAllGroupsCountsParams,
  SearchGroupsParams,
  SearchGroupsCountsData,
  SearchGroupsCountsParams,
  SearchProfilesAutocompleteParams,
  SearchGroupMessagesCountParams,
  SearchGroupMessagesParams,
  SearchGroupMessagesCountResultsData,
  SearchGroupMessagesResultsData,
  SendMessageParams,
  SendMessageResultData,
} from '@features/search/search.types';

import {
  SearchVariant,
  SearchActionButtonType,
} from '@features/search/search.constants';

import { CustomErrorCode } from './profiler.constants';

// Errors
export type FieldError = {
  field: string;
  message: string;
  object?: string;
  rejectedValue?: string;
};

export type Error = {
  error: string;
  customErrorCode?: CustomErrorCode;
  details?: FieldError[];
  message: string;
  status: number;
  timestamp?: string;
};

// Response
export type Response<T> = {
  data?: T;
  error?: Error;
};

export type ResponseResult<T> = [Error | null, T | null];

// Sign In
export type SignInParams = SignInValues;
export type SignInData = Response<TokenData>;
export type SignInResult = ResponseResult<TokenData>;
export type SignIn = (params: SignInParams) => Promise<SignInResult>;

// Sign Up
export type SignUpParams = SignUpValues;
export type SignUpData = Response<UserData>;
export type SignUpResult = ResponseResult<UserData>;
export type SignUp = (params: SignUpParams) => Promise<SignUpResult>;

// Get Session

export type GetSessionData = Response<UserData>;
export type GetSessionResult = ResponseResult<UserData>;
export type GetSession = () => Promise<GetSessionResult>;

// Check registered email
export type CheckRegisteredEmailParams = string;
export type CheckRegisteredEmailData = Response<CheckEmailData>;
export type CheckRegisteredEmailResult = ResponseResult<CheckEmailData>;
export type CheckRegisteredEmail = (
  params: CheckRegisteredEmailParams
) => Promise<CheckRegisteredEmailResult>;

export type GetCountriesData = Country[];
export type GetCountriesResult = ResponseResult<Country[]>;
export type GetCountries = () => Promise<GetCountriesResult>;

export type CheckPhoneNumberParams = string;
export type CheckPhoneNumberData = Response<TrueCallerData>;
export type CheckPhoneNumberResult = ResponseResult<TrueCallerData>;
export type CheckPhoneNumber = (
  params: CheckPhoneNumberParams
) => Promise<CheckPhoneNumberResult>;

export type GetProfilesResultsParams = SearchParams;
export type GetProfilesResultsData = Response<SearchProfilesResultsData>;
export type GetProfilesResults = (
  params: GetProfilesResultsParams
) => Promise<GetProfilesResultsData>;

export type GetProfilesAutocompleteResultsParams = SearchProfilesAutocompleteParams;
export type GetProfilesAutocompleteResultsData = Response<
  SearchProfilesResultsData
>;
export type GetProfilesAutocompleteResults = (
  params: GetProfilesAutocompleteResultsParams
) => Promise<GetProfilesAutocompleteResultsData>;

export type GetProfilesCountsParams = SearchCountsParams;
export type GetProfilesCountsData = Response<SearchProfilesCountsData>;
export type GetProfilesCounts = (
  params: GetProfilesCountsParams
) => Promise<GetProfilesCountsData>;

export type GetProfilesAllCountsParams = SearchAllCountsParams;
export type GetProfilesAllCountsData = {
  [SearchVariant.EXTERNAL]: GetProfilesCountsData;
  [SearchVariant.BACKGROUND]: GetProfilesCountsData;
};
export type GetProfilesAllCounts = (
  params: GetProfilesAllCountsParams
) => Promise<GetProfilesAllCountsData>;

export type SetProfileToBgSearchParams = SearchParams;
export type SetProfileToBgSearchData = Response<ResultCard>;
export type SetProfileToBgSearch = (
  params: SetProfileToBgSearchParams
) => Promise<SetProfileToBgSearchData>;

export type DelProfileFromBgSearchParams = { ids: number[] };
export type DelProfileFromBgSearchData = Response<void>;
export type DelProfileFromBgSearch = (
  params: DelProfileFromBgSearchParams
) => Promise<DelProfileFromBgSearchData>;

export type SetTrackedProfilesParams = { ids: number[] };
export type SetTrackedProfilesData = Response<void>;
export type SetTrackedProfiles = (
  params: SetTrackedProfilesParams
) => Promise<SetTrackedProfilesData>;

export type GetCoordinatesByPlaceParams = SearchPlace;
export type GetCoordinatesByPlaceData = Response<ProfileCoordinates>;
export type GetCoordinatesByPlace = (
  params: GetCoordinatesByPlaceParams
) => Promise<GetCoordinatesByPlaceData>;

export type GetCompanyPermissionsParams = void;
export type GetCompanyPermissionsData = Response<CompanyPermissions>;
export type GetCompanyPermissions = (
  params: GetCompanyPermissionsParams
) => Promise<GetCompanyPermissionsData>;

export type GetGroupsResultsParams = SearchGroupsParams;
export type GetGroupsResultsData = Response<SearchGroupsResultsData>;
export type GetGroupsResults = (
  params: GetGroupsResultsParams
) => Promise<GetGroupsResultsData>;

export type GetGroupByIdParams = string;
export type GetGroupByIdData = Response<SearchGroupSubheaderData>;
export type GetGroupById = (
  params: GetGroupByIdParams
) => Promise<GetGroupByIdData>;

export type GetGroupsCountsParams = SearchGroupsCountsParams;
export type GetGroupsCountsData = Response<SearchGroupsCountsData>;
export type GetGroupsCounts = (
  params: GetGroupsCountsParams
) => Promise<GetGroupsCountsData>;

export type GetAllGroupsCountsParams = SearchAllGroupsCountsParams;
export type GetAllGroupsCountsData = {
  [SearchVariant.EXTERNAL]: GetGroupsCountsData;
  [SearchVariant.INTERNAL]: GetGroupsCountsData;
};
export type GetAllGroupsCounts = (
  params: GetAllGroupsCountsParams
) => Promise<GetAllGroupsCountsData>;

export type SetTrackedGroupsParams = { ids: number[] };
export type SetTrackedGroupsData = Response<void>;
export type SetTrackedGroups = (
  params: SetTrackedGroupsParams
) => Promise<SetTrackedGroupsData>;

export type SetStatusGroupsParams = {
  ids: number[];
  type: SearchActionButtonType;
};
export type SetStatusGroupsData = Response<void>;
export type SetStatusGroups = (
  params: SetStatusGroupsParams
) => Promise<SetStatusGroupsData>;

export type GetMessagesCountParams = SearchGroupMessagesCountParams;
export type GetMessagesCountData = Response<
  SearchGroupMessagesCountResultsData
>;
export type GetMessagesCount = (
  params: GetMessagesCountParams
) => Promise<GetMessagesCountData>;

export type GetMessagesParams = SearchGroupMessagesParams;
export type GetMessagesData = Response<SearchGroupMessagesResultsData>;
export type GetMessages = (
  params: GetMessagesParams
) => Promise<GetMessagesData>;

// export type SendMessageParams = {
//   groupId: number;
//   message: string;
// };
export type SendMessageData = Response<SendMessageResultData>;
export type SendMessage = (
  params: SendMessageParams
) => Promise<SendMessageData>;

// Profiler Api
export type ProfilerApi = {
  api: AxiosInstance;

  signIn: SignIn;
  signUp: SignUp;

  getSession: GetSession;
  getCompanyPermissions: GetCompanyPermissions;
  checkRegisteredEmail: CheckRegisteredEmail;
  checkPhoneNumber: CheckPhoneNumber;

  getCountries: GetCountries;
  getCoordinatesByPlace: GetCoordinatesByPlace;

  getProfilesResults: GetProfilesResults;
  getProfilesAutocompleteResults: GetProfilesAutocompleteResults;
  getProfilesCounts: GetProfilesCounts;
  getProfilesAllCounts: GetProfilesAllCounts;

  setProfileToBgSearch: SetProfileToBgSearch;
  delProfileFromBgSearch: DelProfileFromBgSearch;
  setTrackedProfiles: SetTrackedProfiles;

  getGroupsResults: GetGroupsResults;
  getGroupById: GetGroupById;
  getGroupsCounts: GetGroupsCounts;
  getAllGroupsCounts: GetAllGroupsCounts;

  setTrackedGroups: SetTrackedGroups;
  setStatusGroups: SetStatusGroups;

  getMessagesCount: GetMessagesCount;
  getMessages: GetMessages;
  sendMessage: SendMessage;
};

export type ProfilerApiParams = {
  endpoint: string;
  axios: AxiosStatic;
};

export type CreateProfilerApi = (params: ProfilerApiParams) => ProfilerApi;
