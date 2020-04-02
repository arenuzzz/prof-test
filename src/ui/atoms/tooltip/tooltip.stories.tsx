import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Tooltip } from './tooltip.component';

const OnHoverDiv = ({ title, description }) => {
  const [activeTooltip, toggleTooltip] = React.useState(false);
  return (
    <div
      style={{
        width: 500,
        height: 50,
        backgroundColor: 'blue',
        margin: 300,
        position: 'relative',
      }}
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}
    >
      <Tooltip show={activeTooltip} title={title} description={description} />
    </div>
  );
};

storiesOf('Design System|Atoms/Tooltip', module).add('active', () => {
  const title = text('title', 'ADMIN ROLE HAS BEEN HELD');
  const description = text(
    'description',
    'Admin role in your organization has been held. If you need register new one admin account, get in touch with PROFILER application owner. Old admin account will be deleted after you will be able to register new one admin account on this page.'
  );
  return <OnHoverDiv description={description} title={title} />;
});
