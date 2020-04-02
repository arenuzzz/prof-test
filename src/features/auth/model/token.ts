import { createEvent, createStore } from '@lib/effector';
import { TokenData } from '../auth.types';
import { cookies } from '@lib/cookies';
import { TOKEN_NAME } from '@constants';

export const tokenChanged = createEvent<TokenData>();
export const tokenDropped = createEvent<void>();

export const $token = createStore<TokenData | null>(getTokenData());

$token.on(tokenChanged, (_, tokenData) => tokenData);
$token.on(tokenDropped, (_) => null);

$token.watch((tokenData) => {
  if (tokenData) {
    setTokenData(tokenData);
  }
});

tokenDropped.watch(() => removeTokenData());

function getTokenData(): TokenData | null {
  return cookies.getJSON(TOKEN_NAME) || null;
}

export function setTokenData(data: TokenData) {
  cookies.set(TOKEN_NAME, data);
}

export function removeTokenData() {
  cookies.remove(TOKEN_NAME);
}
