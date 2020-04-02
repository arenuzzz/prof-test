import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { Message } from './message-item.component';

storiesOf('Design System|Molecules/Message', module).add('all', () => {
  const name = text('name', 'Beth Mckinney');
  const nickname = text('nickname', '@misterlorem');
  const variant = text('variant(normal | search)', 'normal');
  const mode = text('mode( " " | admin )', '');
  const timeStamp = text('timeStamp', '25.12.19 / 13:25');
  const content = text(
    'content',
    'Good afternoon, how can I return an erroneous translation?Good afternoon, how can I return an erroneous translation?Good afternoon, how can I return an erroneous'
  );

  return (
    <div style={{ width: 860, padding: 40 }}>
      <Message
        name={name}
        nickname={nickname}
        timeStamp={timeStamp}
        content={content}
        variant={variant}
        mode={mode}
        position='left'
      />
      <Message
        name={name}
        nickname={nickname}
        timeStamp={timeStamp}
        content={content}
        variant='search'
        mode=''
        position='left'
      />
      <Message
        name={name}
        nickname={nickname}
        timeStamp={timeStamp}
        content={content}
        variant={variant}
        mode={mode}
        position='right'
      />
      <Message
        name={name}
        nickname={nickname}
        timeStamp={timeStamp}
        content={content}
        variant={variant}
        mode={mode}
        position='left'
      />
    </div>
  );
});
