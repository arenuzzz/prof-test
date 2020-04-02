import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { TransitionWrapper } from '@ui/atoms/transition-wrapper/transition-wrapper.component';

const DivElem = () => {
  return (
    <div
      style={{
        width: 200,
        height: 200,
        background: 'black',
        transition: 'opacity 0.3s',
      }}
    />
  );
};

storiesOf('Design System|Atoms/TransitionWrapper', module).add('active', () => {
  // const variant = text('variant', 'primary') as ButtonVariant;
  const showPreloader = boolean('show preloader', true);
  return (
    <TransitionWrapper show={showPreloader}>
      <DivElem />
    </TransitionWrapper>
  );
});
