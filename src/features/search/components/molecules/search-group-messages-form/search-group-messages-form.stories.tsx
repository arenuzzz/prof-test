import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchFormTemplate } from '../../templates/search-form';

import { SearchGroupMessagesForm } from './search-group-messages-form.component';

const actions = {
  onSubmit: action('onSubmit'),
};

storiesOf('Features|Search/Molecules/SearchGroupMessagesForm', module).add(
  'default',
  () => {
    const minDate = new Date('2020.02.01');
    const maxDate = new Date('2020.04.12');

    const groupId = 74;

    const initialValues = {
      date: {
        fromDate: minDate,
        toDate: maxDate,
      },
    };

    return (
      <div style={{ height: '100vh' }}>
        <SearchFormTemplate
          title='Group search'
          form={
            <SearchGroupMessagesForm
              onSubmit={actions.onSubmit}
              initialValues={initialValues}
              minDate={minDate}
              maxDate={maxDate}
              groupId={groupId}
            />
          }
        />
      </div>
    );
  }
);
