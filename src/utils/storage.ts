const options = {
  namespace: "interview_", // key prefix
  storage: "localStorage", // storage name session, local, memory
  default_cache_time: 60 * 60 * 24 * 7,
  isEncrypt: false,
};

export const storage = {
  getKey: (key: string) => {
    return options.namespace + key;
  },
  set: (
    key: string,
    value: string,
    expire: number | null = options.default_cache_time
  ) => {
    const stringData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    });
    window.localStorage.setItem(storage.getKey(key), stringData);
  },
  get: (key: string) => {
    const item = window.localStorage.getItem(storage.getKey(key));
    if (item) {
      try {
        const data = JSON.parse(item);
        const { value, expire } = data;
        if (expire === null || expire >= Date.now()) {
          return value;
        }
        storage.remove(storage.getKey(key));
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  },
  remove: (key: string) => {
    window.localStorage.removeItem(storage.getKey(key));
  },
  clear: (): void => {
    window.localStorage.clear();
  },
};
