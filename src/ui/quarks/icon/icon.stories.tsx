import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { Icon, IconVariant } from './icon.component';

export const iconProps = {};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Quarks/Icon', module)
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add('all', () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '500px',
          height: '40px',
        }}
      >
        <Icon
          variant='check'
          style={{ fill: 'red', width: '40px', height: '40px' }}
        />
        <Icon
          variant='close-full'
          style={{ fill: 'red', width: '40px', height: '40px' }}
        />
        <Icon
          variant='delete'
          style={{ fill: 'red', width: '40px', height: '40px' }}
        />
        <Icon
          variant='down'
          style={{ fill: 'red', width: '40px', height: '40px' }}
        />
        <Icon
          variant='search'
          style={{ fill: 'red', width: '40px', height: '40px' }}
        />
        <Icon
          variant='social-group'
          style={{ fill: '#005B8C', width: '40px', height: '40px' }}
        />
        <Icon
          variant='default-avatar'
          style={{ fill: 'black', width: '40px', height: '40px' }}
        />
      </div>
    );
  });
