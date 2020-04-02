import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import { SearchFormTemplate } from './search-form.template';
import { height, width } from 'styled-system';

export const props = {
  title: 'External search',
  //   variant: 'primary',
};

export const actions = {
  //   onClick: action('onClick'),
};

storiesOf('Features|Search/Templates/SearchForm', module).add('primary', () => {
  const title = text('title', props.title);

  const form = (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'aqua',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      FORM
    </div>
  );

  return (
    <div style={{ width: 356, height: '100vh' }}>
      <SearchFormTemplate title={title} form={form} />
    </div>
  );
});
