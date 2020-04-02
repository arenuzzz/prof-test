import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import { Button, ButtonVariant } from './button.component';

export const buttonProps = {
  children: 'Download',
  variant: 'primary',
};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Atoms/Button', module)
  .add('default', () => {
    const children = text('children', 'Download');
    const variant = text('variant', 'default') as ButtonVariant;
    return (
      <Button {...actions} variant={variant}>
        {children}
      </Button>
    );
  })
  .add('primary', () => {
    const children = text('children', 'Download');
    const variant = text('variant', 'primary') as ButtonVariant;
    return (
      <Button {...actions} variant={variant}>
        {children}
      </Button>
    );
  })
  .add('secondary', () => {
    const children = text('children', 'Download');
    const variant = text('variant', 'secondary') as ButtonVariant;
    return (
      <Button {...actions} variant={variant}>
        {children}
      </Button>
    );
  })
  .add('disabled', () => {
    const children = text('children', 'Download');
    const variant = text('variant', 'primary') as ButtonVariant;
    const disabled = boolean('disabled', true);

    return (
      <Button {...actions} variant={variant} disabled={disabled}>
        {children}
      </Button>
    );
  });
