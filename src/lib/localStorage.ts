function configLocalStorage(storage: WindowLocalStorage['localStorage']) {
  function get(key: string) {
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function set(key: string, value: string | Object) {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  function getJSON<T>(key: string): T | null {
    try {
      const item = get(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  }

  return {
    set,
    get,
    getJSON,
  };
}

export const localStorage = configLocalStorage(window.localStorage);
