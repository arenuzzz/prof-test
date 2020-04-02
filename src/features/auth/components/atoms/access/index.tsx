import React from 'react';
import { useStore } from '@lib/effector';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { $session, fetchSession } from '@features/auth/model/session';
import { $token } from '@features/auth/model/token';
import { AccessPermission } from '@features/auth/auth.types';
import {
  $permissions,
  fetchPermissions,
} from '@features/auth/model/permissions';
import { isCompanyType } from '@constants';
import { mainPreloaderApi } from '@features/auth/model';

export type AccessProps = {
  children: React.ReactNode;
  permissions: AccessPermission[];
};

export function Access({ children, permissions: accesses = [] }: AccessProps) {
  // const history = useHistory();

  const location = useLocation();

  const session = useStore($session);
  const permissions = useStore($permissions);
  const token = useStore($token);

  React.useEffect(() => {
    if (token && !session) {
      fetchSession();
    }
  }, [token, session]);

  React.useEffect(() => {
    if (isCompanyType) {
      fetchPermissions();
    }
  }, [location]);

  React.useEffect(() => {
    // mainPreloaderApi.show();

    // if (
    //   (isCompanyType && permissions && permissions.data) ||
    //   (token && session) ||
    //   !token
    // ) {
    setTimeout(() => {
      mainPreloaderApi.hide();
    }, 400);
    // }
  }, [location]);

  if (isCompanyType) {
    if (!permissions.data) {
      return null;
    }

    const { isAdminAssigned, isCompanyBlocked } = permissions.data;

    if (isCompanyBlocked && location.pathname !== '/access-stopped') {
      return <Redirect to='/access-stopped' />;
    }

    if (isAdminAssigned && location.pathname === '/sign-up') {
      return <Redirect to='/welcome' />;
    }

    if (!isCompanyBlocked && location.pathname === '/access-stopped') {
      return <Redirect to='/welcome' />;
    }
  } else if (location.pathname === '/access-stopped') {
    return <Redirect to='/welcome' />;
  }

  if (token && !session) {
    return null;
  }

  if (
    session &&
    (location.pathname === '/welcome' ||
      location.pathname === '/sign-in' ||
      location.pathname === '/sign-up')
  ) {
    return <Redirect to='/search' />;
  }

  if (accesses.includes('auth') && !session && !token) {
    return <Redirect to='/sign-in' />;
  }

  return children;
}
