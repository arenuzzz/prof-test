import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import { SwitcherMessage } from './switcher-message.component';

storiesOf('Design System|Atoms/SwitcherMessage', module).add(
  'Switcher Message',
  () => {
    const current = number('current', 10);
    const count = number('count', 120);

    return (
      <div style={{ margin: 20, maxWidth: 'fit-content' }}>
        <SwitcherMessage count={count} current={current} />
      </div>
    );
  }
);
