import { cookies } from '@lib/cookies';
import { createEvent, createStore, createApi, guard } from '@lib/effector';

const CAPTCHA_COOKIE_NAME = 'super_captcha';

export const incrementPasswordWrongCount = createEvent();
export const resetPasswordWrongCount = createEvent();
export const $passwordWrongCount = createStore<number>(0);

export const $hasCaptcha = createStore(cookies.getJSON(CAPTCHA_COOKIE_NAME));
// export const $hasCaptcha = createStore(false);

export const captcha = createApi($hasCaptcha, {
  show: () => true,
  hide: () => false,
});

$hasCaptcha.reset(resetPasswordWrongCount);

$passwordWrongCount
  .on(incrementPasswordWrongCount, (state) => state + 1)
  .reset(resetPasswordWrongCount);

const hasCaptchaGuard = guard({
  source: $passwordWrongCount,
  filter: (count) => count === 3,
});

hasCaptchaGuard.watch(() => captcha.show());

$hasCaptcha.updates.watch((hasCaptcha) => {
  cookies.set(CAPTCHA_COOKIE_NAME, hasCaptcha);
});
