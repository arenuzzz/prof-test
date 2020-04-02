import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Routes } from './routes';
import { Theming } from '@styles/theming';
import { App } from './app';
import { Routing } from './routing';

type Props = {};

export const Root: React.FC<Props> = hot(module)(() => {
  return (
    <Routing>
      <Theming>
        <App>
          <Routes />
        </App>
      </Theming>
    </Routing>
  );
});
