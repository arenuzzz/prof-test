import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Tabs, TabItem } from './tabs.component';
import { Card } from '@ui/organisms/card';

storiesOf('Design System|Atoms/Tabs', module).add('active', () => {
  const value = text('values', '100');
  // const variant = text('variant', 'primary') as ButtonVariant;
  // const showPreloader = boolean('show preloader', true);
  return (
    <div style={{ margin: 30 }}>
      <Tabs defaultIndex='1' onTabClick={() => console.log}>
        <TabItem label='Facebook' values={`(${value})`} index='1'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'social'} /> */}
          </div>
        </TabItem>
        <TabItem label='Vkontakte' values={`(${value})`} index='2'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'social'} />
            <Card variant={'social'} />
            <Card variant={'social'} />
            <Card variant={'social'} /> */}
          </div>
        </TabItem>
        <TabItem label='LinkedIn' values={`(${value})`} index='3'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'messenger'} /> */}
          </div>
        </TabItem>
        <TabItem label='Instagram' values={`(${value})`} index='4'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'messenger'} /> */}
          </div>
        </TabItem>
        <TabItem label='WhatsApp' values={`(${value})`} index='5'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'messenger'} /> */}
          </div>
        </TabItem>
        <TabItem label='Viber' values={`(${value})`} index='6'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'messenger'} /> */}
          </div>
        </TabItem>
        <TabItem label='Telegram' values={`(${value})`} index='7'>
          <div style={{ width: 544, marginTop: 20 }}>
            {/* <Card variant={'messenger'} /> */}
          </div>
        </TabItem>
      </Tabs>
    </div>
  );
});
