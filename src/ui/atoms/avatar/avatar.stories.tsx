import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Avatar } from './avatar.component';

storiesOf('Design System|Atoms/Avatar', module)
  .add('default-variant', () => {
    const source = text('Src', '');

    return <Avatar imgSrc={source} />;
  })
  .add('default-variant-group', () => {
    const source = text('Src', '');

    return <Avatar imgSrc={source} variant='d' />;
  });
