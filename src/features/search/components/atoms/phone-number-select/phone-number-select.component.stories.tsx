import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { Country } from '@features/search/search.types';

import { PhoneNumberSelect } from './phone-number-select.component';

import countries from '@assets/countries.json';

const data = countries as Country[];

const mappedCountries = data.map(({ phoneCode, name, code }) => ({
  value: `+${phoneCode}/${code}`,
  label: `+${phoneCode}`,
  data: {
    countryName: name,
    code,
  },
}));

const props = {
  defaultValue: '',
  data: mappedCountries,
  isError: false,
};

storiesOf('Features|Search/Molecules/Phone number Select', module).add(
  'default',
  () => {
    const isError = boolean('isError', props.isError);
    const selectPlaceholder = text('selectPlaceholder', '+');
    const inputPlaceholder = text('inputPlaceholder', 'Enter the phone');

    // const [value, onChange] = React.useState(props.defaultValue);

    return (
      <div style={{ width: 300 }}>
        <Form
          debug={({ values }) => console.log('values', values)}
          onSubmit={() => {}}
          initialValues={{
            phone: {
              number: '',
              code: '',
            },
          }}
        >
          {({ handleSubmit, values }) => {
            // console.log('values', values);

            return (
              <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
                <Field<{ number: string; code: string }> name='phone'>
                  {({ input }) => {
                    return (
                      <PhoneNumberSelect
                        value={input.value}
                        data={props.data}
                        selectPlaceholder={selectPlaceholder}
                        inputPlaceholder={inputPlaceholder}
                        isError={isError}
                        onChange={input.onChange}
                      />
                    );
                  }}
                </Field>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
);
