import { configure, addDecorator } from '@storybook/react';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import requireContext from 'require-context.macro';
import { withInfo } from '@storybook/addon-info';
import { withTheming } from '@styles/theming';
import { withRouting } from '../src/routing';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

// const EventSource = NativeEventSource || EventSourcePolyfill;
// OR: may also need to set as global property
global.EventSource = NativeEventSource || EventSourcePolyfill;

addDecorator(withRouting);
addDecorator(withTheming);
addDecorator(withPropsTable);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withInfo);

const req = requireContext('../src', true, /\.stories\.(ts|js)?x$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
