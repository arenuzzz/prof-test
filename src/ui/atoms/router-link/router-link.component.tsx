import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export type RouterLinkProps = {} & LinkProps;
export type RouterLinkFC = React.FC<RouterLinkProps>;

export const RouterLink: RouterLinkFC = (props) => {
  return <Link {...props} />;
};

export default RouterLink;
