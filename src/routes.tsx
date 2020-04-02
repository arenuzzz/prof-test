import * as React from 'react';
import { renderRoutes } from '@lib/routing';
import { routes } from './pages';

export const Routes: React.FC = () => {
  return renderRoutes(routes());
};
