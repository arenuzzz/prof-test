import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { storiesOf } from '@storybook/react';

import { InputFileLink } from './input-file-link.component';

storiesOf('Features|Search/Atoms/InputFileLink', module).add('default', () => {
  const linkTemplate = 'https://chat.whatsapp.com/';

  function onSubmit(values) {
    console.log('submit', values);
  }

  return (
    <FinalForm
      onSubmit={onSubmit}
      // validate={(values) => {
      //   return undefined;
      // }}
      initialValues={{
        links: {
          fileName: '',
          data: [],
          error: '',
          isReading: false,
        },
      }}
      render={({ form, validating, submitting, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name='links'
              // validate={(value) => {
              //   console.log('links', value);
              // }}
              render={({ input }) => {
                // console.log('links', input.value);

                return (
                  <div
                    style={{
                      position: 'relative',
                      width: 38,
                      height: 38,
                      margin: '100px 100px',
                    }}
                  >
                    <InputFileLink
                      filterArray={(str) => str.startsWith(linkTemplate)}
                      onChange={input.onChange}
                      value={input.value}
                      maxReadingSize={5}
                    />
                  </div>
                );
              }}
            />
            <button type='submit' disabled={validating || submitting}>
              Submit
            </button>
          </form>
        );
      }}
    />
  );
});
