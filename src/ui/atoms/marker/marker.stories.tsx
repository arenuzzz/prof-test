import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Marker } from './marker.component';

storiesOf('Design System|Atoms/Marker', module).add('main', () => {
  return <Marker lat={123} lng={123} />;
});
