import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonGroup } from './button-group.component';
import { TabItem } from '@ui/atoms/tabs/tabs.component';
import { text } from '@storybook/addon-knobs';

storiesOf('Design System|Molecules/ButtonGroup', module).add('active', () => {
  const text1 = text('text1', 'External search');
  const text2 = text('text2', 'Background search');
  const DivElem = ({ color }) => {
    return (
      <div
        style={{
          marginTop: 20,
          width: 100,
          height: 100,
          backgroundColor: color,
        }}
      />
    );
  };

  return (
    <div style={{ margin: 30 }}>
      <ButtonGroup defaultIndex={'1'} onTabClick={() => console.log}>
        <TabItem label={text1} index='1'>
          <DivElem color={'black'} />
        </TabItem>
        <TabItem label={text2} index='2'>
          <DivElem color={'red'} />
        </TabItem>
      </ButtonGroup>
    </div>
  );
});
