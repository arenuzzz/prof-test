import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { Link, LinkProps } from './link.component';

export const linkProps = {
  href: 'https://shlomi.shpirer@ontrio.io',
  children: 'Shlomi.Shpirer@ontrio.io',
};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Atoms/Link', module).add('primary', () => {
  const href = text('href', linkProps.href);
  const children = text('children', linkProps.children);

  return (
    <Link {...actions} href={href}>
      {children}
    </Link>
  );
});
