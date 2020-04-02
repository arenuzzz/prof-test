import { TrueCallerData } from '@features/search/search.types';
import {
  createStore,
  createEvent,
  forward,
  guard,
  sample,
} from '@lib/effector';
import * as _ from 'lodash';

import { localStorage } from '@lib/localStorage';
import { PhoneNumberSelectValue } from '../components/atoms/phone-number-select';

import { SearchParams, SearchCountsParams } from '../search.types';
import { $trueCallerData, fxCheckPhone } from './truecaller';

export type SearchFormValues = {
  phone?: PhoneNumberSelectValue;
  country?: string;
  initials?: string;
  vkontakteLink?: string;
  linkedinLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  telegramLink?: string;
};

const FORM_NAME = 'search_form';

const defaultValues: SearchFormValues = {
  phone: {
    phoneCode: '',
    code: '',
    phoneNumber: '',
    number: '',
  },
  country: '',
  initials: '',
  vkontakteLink: '',
  linkedinLink: '',
  facebookLink: '',
  instagramLink: '',
  telegramLink: '@',
};

const initialFormValues = getSearchFormStorageData() || defaultValues;

function getSearchFormStorageData() {
  return localStorage.getJSON<SearchFormValues>(FORM_NAME);
}
function saveSearchFormStorageData(data: SearchFormValues) {
  localStorage.set(FORM_NAME, data);
}

export const searchProfiles = createEvent<
  SearchCountsParams & {
    phoneCountryName?: string;
  }
>();
export const submitSearchForm = createEvent<SearchCountsParams>();
export const submitSearchFormAfterLoading = createEvent<SearchCountsParams>();
export const saveSearchFormValues = createEvent<SearchCountsParams>();

export const $searchCountryPhoneName = createStore<string>('');

export const $searchParams = createStore<SearchCountsParams>({
  isBackground: false,
});
export const $initialSearchFormValues = createStore<SearchFormValues>(
  initialFormValues
);

$searchParams.on(
  searchProfiles,
  (_, { phoneCountryName, ...params }) => params
);

$searchCountryPhoneName.on(
  searchProfiles,
  (_, { phoneCountryName }) => phoneCountryName || ''
);

const debouncedSave = _.debounce(saveSearchFormStorageData, 300);

saveSearchFormValues.watch(debouncedSave);
forward({ from: searchProfiles, to: submitSearchForm });
