import { ResponseResult } from '@api/profiler';
import {
  Effect,
  createEffect,
  createStore,
  createEvent,
  createFetching,
} from '@lib/effector';
import { UserData } from '../auth.types';

type LoadSession = Effect<void, ResponseResult<UserData>, any>;

export const fetchSession: LoadSession = createEffect();
export const sessionFetching = createFetching(fetchSession, 'initial', {
  result: [null, null],
});

export const $session = createStore<ResponseResult<UserData> | null>(null);
export const sessionDropped = createEvent<void>();

export const $isLoggedIn = $session.map((session) => session !== null);

export const $isAdmin = $session.map((session) => {
  return session !== null && session[1] && session[1].isAdmin;
});

$session
  .on(fetchSession.done, (_, { result }) => result)
  .on(fetchSession.fail, (_) => null)
  .reset(sessionDropped);
