import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';
import { Country } from '@features/search/search.types';

import { SearchForm } from './search-form.component';

import countriesJSON from '@assets/countries.json';
import { SearchFormTemplate } from '../../templates/search-form';

type Props = { countries: Country[] };

const props: Props = {
  countries: countriesJSON,
};

const actions = {
  onSubmit: action('onSubmit'),
};

storiesOf('Features|Search/Molecules/Search Form', module).add(
  'default',
  () => {
    const countries = object(
      'countries',
      props.countries
    ) as Props['countries'];

    return (
      <div style={{ height: '100vh' }}>
        <SearchFormTemplate
          title='External search'
          form={
            <SearchForm onSubmit={actions.onSubmit} countries={countries} />
          }
        />
      </div>
    );
  }
);
