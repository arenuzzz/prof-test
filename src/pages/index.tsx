import * as React from 'react';
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { Redirect } from 'react-router';
import { Access } from '@features/auth/components/atoms/access';
import { AccessPermission } from '@features/auth/auth.types';
// import { HomePage } from './home';
import { WelcomePage } from './welcome';
import { SignUpPage } from './sign-up';
import { SignInPage } from './sign-in';
import { UserPage } from './user';
import { SearchPage } from './search';
import { AccessStoppedPage } from './access-stopped';
import { GroupsPage } from './groups';
import { GroupsItemPage } from './groups/id';

export type CustomRouteConfig = RouteConfig & {
  permissions?: AccessPermission[];
};

export const routes = (): CustomRouteConfig[] => [
  {
    path: '/sign-up',
    exact: true,
    component: SignUpPage,
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignInPage,
  },
  {
    path: '/welcome',
    exact: true,
    component: WelcomePage,
  },
  {
    permissions: ['auth'],
    path: '/user',
    exact: true,
    component: UserPage,
  },
  {
    permissions: ['auth'],
    path: '/search',
    exact: true,
    component: SearchPage,
  },
  {
    permissions: ['auth'],
    path: '/groups',
    exact: true,
    component: GroupsPage,
  },
  {
    permissions: ['auth'],
    path: '/groups/:id',
    exact: true,
    component: GroupsItemPage,
  },
  {
    path: '/access-stopped',
    exact: true,
    component: AccessStoppedPage,
  },
  {
    render: (props) => {
      return <Redirect to='/welcome' />;
    },
  },
];
