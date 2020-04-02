import { Response, profilerApi } from '@api/profiler';
import {
  Effect,
  createEffect,
  createStore,
  createEvent,
  createFetching,
} from '@lib/effector';
import { CompanyPermissions } from '../auth.types';

type FetchPermissions = Effect<void, Response<CompanyPermissions>, any>;

export const fetchPermissions: FetchPermissions = createEffect();
export const fetchingPermissions = createFetching(fetchPermissions);

fetchPermissions.use(() => profilerApi.getCompanyPermissions());
// fetchPermissions.use(() =>
//   Promise.resolve({
//     data: {
//       isAdminAssigned: true,
//       isCompanyBlocked: true,
//     },
//   })
// );

export const $permissions = createStore<Response<CompanyPermissions>>({});

export const permissionsDropped = createEvent<void>();

$permissions
  .on(fetchPermissions.done, (_, { result }) => result)
  .on(fetchPermissions.fail, (_) => {})
  .reset(permissionsDropped);
