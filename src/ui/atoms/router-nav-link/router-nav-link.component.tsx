import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export type RouterNavLinkProps = {} & NavLinkProps;
export type RouterNavLinkFC = React.FC<RouterNavLinkProps>;

export const RouterNavLink: RouterNavLinkFC = (props) => {
  return <NavLink {...props} />;
};

export default RouterNavLink;
