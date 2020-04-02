import Cookies, { CookiesStatic } from 'js-cookie';

function configCookies(cookies: CookiesStatic) {
  function set(name: string, data: string | Object) {
    try {
      cookies.set(name, data);
    } catch (error) {}
  }

  function get(name: string) {
    try {
      return cookies.get(name) || null;
    } catch (error) {
      return null;
    }
  }

  function remove(name: string) {
    try {
      cookies.remove(name);
    } catch (error) {}
  }

  function getJSON(name: string): any {
    try {
      return cookies.getJSON(name) || null;
    } catch (error) {
      return null;
    }
  }

  return { set, remove, get, getJSON };
}

export const cookies = configCookies(Cookies);
