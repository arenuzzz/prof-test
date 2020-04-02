import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { Captcha } from './captcha.component';
import { GOOGLE_SITE_KEY } from '@constants';

export const props = {};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Atoms/Captcha', module).add('primary', () => {
  const lng = text('lng', 'ru');
  const siteKey = text('siteKey', GOOGLE_SITE_KEY);

  return <Captcha lng={lng} siteKey={siteKey} />;
});
