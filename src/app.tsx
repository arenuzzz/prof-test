import * as React from 'react';
import { LayoutTemplate } from '@ui/templates/layout';

import '@features/auth';

export type AppProps = {
  children: React.ReactNode;
};

export type AppFC = React.FC<AppProps>;

export const App: AppFC = ({ children }) => {
  return <LayoutTemplate>{children}</LayoutTemplate>;
};
