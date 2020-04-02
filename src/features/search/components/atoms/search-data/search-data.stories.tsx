import React from 'react';
import { storiesOf } from '@storybook/react';

import { ContentNotFound } from '@features/search/components/atoms/content-not-found';
import { text } from '@storybook/addon-knobs';
import { SearchData } from './search-data.component';

const props = {
  message: `Taking into account parameters that you entered Crawler hasn't found the group`,
};

storiesOf('Features|Search/Atoms/search-data', module).add('default', () => {
  const message = text('Message', props.message);

  return (
    <div style={{ width: 500, height: '100vh' }}>
      <SearchData>
        <SearchData.Content>
          <ContentNotFound>{message}</ContentNotFound>
        </SearchData.Content>
      </SearchData>
    </div>
  );
});
