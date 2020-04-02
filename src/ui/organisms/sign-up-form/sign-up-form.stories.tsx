import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SignUpForm } from './sign-up-form.component';
import { AppType } from '@constants';

export const props = {};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Organisms/SignUpForm', module)
  .add('demo', () => {
    function onSubmit() {}

    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '21px' }}
      >
        <div style={{ width: 480, height: '100%' }}>
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  })
  .add('company', () => {
    function onSubmit() {}

    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '21px' }}
      >
        <div style={{ width: 480, height: '100%' }}>
          <SignUpForm appType={AppType.COMPANY} onSubmit={onSubmit} />
        </div>
      </div>
    );
  });
