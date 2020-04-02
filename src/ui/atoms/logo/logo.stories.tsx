import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import { Logo } from './logo.component';

export const logoProps = {};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Atoms/Logo', module).add('primary', () => {
  return <Logo />;
});
