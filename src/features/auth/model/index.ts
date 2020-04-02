import { createStore, split, createApi } from '@lib/effector';
import { history } from '@lib/routing/history';
import { profilerApi, CustomErrorCode } from '@api/profiler';
import { fetchSession, sessionDropped } from './session';
import { tokenDropped, $token, tokenChanged } from './token';

const tokenAuthRequestInterceptor = profilerApi.api.interceptors.request.use(
  (config) => {
    const tokenData = $token.getState();

    if (tokenData) {
      config.headers.Authorization = `${tokenData.token_type}${tokenData.access_token}`;
    }

    return config;
  }
);

const tokenAuthResponseInterceptor = profilerApi.api.interceptors.response.use(
  (response) => {
    const {
      data: { error, data },
    } = response;

    if (error && error.status === 401) {
      sessionDropped();
    }

    if (error && error.customErrorCode === CustomErrorCode.COMPANY_BLOCKED) {
      sessionDropped();
      history.replace('/access-stopped');
    }

    if (data && data.access_token) {
      tokenChanged(data);
    }

    return response;
  }
);

fetchSession.use(() => profilerApi.getSession());
fetchSession.fail.watch(() => tokenDropped());
sessionDropped.watch(tokenDropped);

export const $isShowMainPreloader = createStore<boolean>(true);
export const mainPreloaderApi = createApi($isShowMainPreloader, {
  show: () => true,
  hide: () => false,
  toggle: (s) => !s,
});
