import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchFormTemplate } from '../../templates/search-form';

import { SearchGroupsForm } from './search-groups-form.component';

const actions = {
  onSubmit: action('onSubmit'),
};

storiesOf('Features|Search/Molecules/SearchGroupsForm', module).add(
  'default',
  () => {
    // function onSubmit(values) {
    //   console.log('Submmitted values', values);
    // }

    return (
      <div style={{ height: '100vh' }}>
        <SearchFormTemplate
          title='Group search'
          form={<SearchGroupsForm onSubmit={actions.onSubmit} />}
        />
      </div>
    );
  }
);
