import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { LayoutTemplate, LayoutTemplateProps } from './layout.template';

export const layoutProps = {
  children: 'Main',
};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Templates/LayoutTemplate', module).add(
  'default',
  () => {
    const children = text('children', layoutProps.children);

    return <LayoutTemplate>{children}</LayoutTemplate>;
  }
);
