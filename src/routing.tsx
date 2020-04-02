import * as React from 'react';
import { Router } from 'react-router-dom';
import { history } from '@lib/routing/history';

export const Routing = ({ children }) => {
  return <Router history={history}>{children}</Router>;
};

export const withRouting = (story: Function) => <Routing>{story()}</Routing>;

export default Routing;
