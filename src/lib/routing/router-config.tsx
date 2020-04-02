import React from 'react';
import { Switch, Route, matchPath, Router } from 'react-router';
import { Access } from '@features/auth/components/atoms/access';
import { AccessPermission } from '@features/auth/auth.types';

export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const routeComp = route.render ? (
              route.render({ ...props, ...extraProps, route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            );

            return (
              <Access
                permissions={(route.permissions as AccessPermission[]) || []}
              >
                {routeComp}
              </Access>
            );
          }}
        />
      ))}
    </Switch>
  ) : null;
}

export function matchRoutes(routes, pathname, /*not public API*/ branch = []) {
  routes.some((route) => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
      ? branch[branch.length - 1].match // use parent match
      : Router.computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({ route, match });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });

  return branch;
}
