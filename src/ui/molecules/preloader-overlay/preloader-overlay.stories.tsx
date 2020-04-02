import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { PreloaderOverlay } from './preloader-overlay.component';

storiesOf('Design System|Molecules/PreloaderOverlay', module).add(
  'active',
  () => {
    const title = text('title', 'The data is being loaded now');
    // const variant = text('variant', 'primary') as ButtonVariant;
    const showPreloader = boolean('show preloader', true);

    return <PreloaderOverlay title={title} showPreloader={showPreloader} />;
  }
);
