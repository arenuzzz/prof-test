import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { Preloader } from './preloader.component';

export const preloaderProps = {};

storiesOf('Design System|Atoms/Preloader', module).add('active', () => {
  const title = text('title', 'The data is being loaded now');
  // const variant = text('variant', 'primary') as ButtonVariant;
  // const disabled = boolean('disabled', true);

  return <Preloader title={title} />;
});
