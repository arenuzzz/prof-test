import React from 'react';
import { useStore } from '@lib/effector';

import { $countries, $trueCallerData } from '@features/search';

import { SearchForm, SearchFormProps } from './search-form.component';
import {
  SearchFormValues,
  submitSearchForm,
  searchProfiles,
} from '@features/search/model/search-form';
import {
  SearchParams,
  SearchCountsParams,
} from '@features/search/search.types';
import { sleep } from '@lib/helpers';

export type SearchFormContainerProps = {};

export function SearchFormContainer(props: SearchFormContainerProps) {
  const countries = useStore($countries);

  async function onSubmit(values: SearchFormValues, form) {
    const params: SearchCountsParams & {
      phoneCountryName?: string;
    } = {
      isBackground: false,
    };

    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        return;
      }

      if (key === 'phone') {
        if (typeof value === 'object' && value.phoneNumber) {
          params.phoneNumber = value.phoneNumber;

          if (countries) {
            const country = countries.find(
              ({ code }) => code === value.countryCode
            );

            if (country) {
              params.phoneCountryName = country.name;
            }
          }
        }
      } else if (key === 'telegramLink') {
        if (value && value !== '@') {
          params[key] = value;
        }
      } else {
        params[key] = value;
      }
    });

    const isLoadingTruecallerData = $trueCallerData.getState().isLoading;

    await sleep(400);

    const { data: truecallerData } = $trueCallerData.getState();

    const initials =
      isLoadingTruecallerData && truecallerData && truecallerData.isExists
        ? truecallerData.initials
        : params.initials;

    if (initials && !params.country) {
      return { country: 'Required' };
    }

    searchProfiles({ ...params, initials });
  }

  return <SearchForm onSubmit={onSubmit} countries={countries} />;
}
