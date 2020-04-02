import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Country } from '@features/search/search.types';

import { CountrySelect } from './country-select.component';

import countries from '@assets/countries.json';

const data = countries as Country[];

const mappedCountries = data.map(({ code, name }) => ({
  value: code,
  label: name,
}));

const props = {
  defaultValue: 'vc',
  data: mappedCountries,
};

storiesOf('Features|Search/Atoms/CountrySelect', module).add('primary', () => {
  const [value, onChange] = React.useState(props.defaultValue);

  return (
    <div style={{ width: 300 }}>
      <CountrySelect
        value={value}
        // defaultValue={props.defaultValue}
        data={props.data}
        placeholder='Select country'
        onChange={onChange}
      />
    </div>
  );
});
