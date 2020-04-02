import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { text } from '@storybook/addon-knobs';

import { GOOGLE_SITE_KEY, AppType } from '@constants';

import { SignInForm } from './sign-in-form.component';

export const props = {
  siteKey: GOOGLE_SITE_KEY,
};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Organisms/SignInForm', module)
  .add('demo', () => {
    function onSubmit() {}

    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '21px' }}
      >
        <div style={{ width: 480, height: '100%' }}>
          <SignInForm onSubmit={onSubmit} />
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
          <SignInForm onSubmit={onSubmit} appType={AppType.COMPANY} />
        </div>
      </div>
    );
  });
