const storagePrefix = "msw-db";

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  setRequire2FA: (require2FA) => {
    window.localStorage.setItem(
      `${storagePrefix}require2FA`,
      JSON.stringify(require2FA)
    );
  },
  getRequire2FA: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}require2FA`)
    );
  },
  setUserId: (userId) => {
    window.localStorage.setItem(
      `${storagePrefix}userId`,
      JSON.stringify(userId)
    );
  },
  getUserId: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}userId`));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
