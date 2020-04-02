import { SearchVariant } from '@features/search/search.constants';
import { createStore, createEvent, forward } from '@lib/effector';
import * as _ from 'lodash';

import { localStorage } from '@lib/localStorage';

import { PhoneNumberSelectValue } from '../components/atoms/phone-number-select';
import { InputGroupLinkValue } from '../components/molecules/input-group-link';

import { SearchGroupsCountsParams } from '../search.types';

export type SearchGroupsFormValues = {
  name?: string;
  whatsappLinks?: InputGroupLinkValue;
  viberLinks?: InputGroupLinkValue;
  telegramLinks?: InputGroupLinkValue;
};

const FORM_NAME = 'search_groups_form';

const defaultValues: SearchGroupsFormValues = {
  name: '',
  whatsappLinks: {
    fileName: '',
    data: [],
    error: '',
    isReading: false,
    link: '',
    lastChanged: '',
  },
  viberLinks: {
    fileName: '',
    data: [],
    error: '',
    isReading: false,
    link: '',
    lastChanged: '',
  },
  telegramLinks: {
    fileName: '',
    data: [],
    error: '',
    isReading: false,
    link: '',
    lastChanged: '',
  },
};

const initialFormValues = getSearchFormStorageData() || defaultValues;

function getSearchFormStorageData() {
  const data = localStorage.getJSON<SearchGroupsFormValues>(FORM_NAME);

  if (data && typeof data === 'object') {
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        data[key].fileName = '';
      }
    });
  }

  return data;
}

function saveSearchFormStorageData(data: SearchGroupsFormValues) {
  localStorage.set(FORM_NAME, data);
}

export const searchGroups = createEvent<SearchGroupsFormValues>();
export const submitSearchGroupsForm = createEvent<SearchGroupsFormValues>();

export const saveSearchGroupsFormValues = createEvent<SearchGroupsFormValues>();
export const $searchGroupsParams = createStore<SearchGroupsFormValues>({});

export const $initialSearchGroupsFormValues = createStore<
  SearchGroupsFormValues
>(initialFormValues);

$searchGroupsParams.on(searchGroups, (_, { ...params }) => params);

const debouncedSave = _.debounce(saveSearchFormStorageData, 300);

saveSearchGroupsFormValues.watch(debouncedSave);

forward({ from: searchGroups, to: submitSearchGroupsForm });
