import { CoolSpinner } from "components/Elements";
import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  logout,
  refreshLoginToken,
} from "features/auth";
import storage from "utils/storage";
import { initReactQueryAuth } from "react-query-auth";
import { useNotificationStore } from "stores/notifications";

async function handleUserResponse(data) {
  const { token, user, message, status } = data;
  if (token) {
    storage.setToken(token);
  }

  useNotificationStore.getState().addNotification({
    type: status,
    title: status,
    message,
  });

  if (!token && !user) {
    return window.location.assign("/");
  }

  return user;
}

async function loadUser() {
  const token = storage.getToken()
  if (token) {
    var data = await getUser();

    if (!data) {
      data = await refreshLoginToken();
      return data;
    }
    return data;
  }
  return null;
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function refetchUser() {
  const response = await refreshLoginToken();
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data) {
  const response = await registerWithEmailAndPassword(data);
  // const user = await handleUserResponse(response);
  return response;
}

async function logoutFn() {
  const response = await logout();
  storage.clearToken();
  const user = await handleUserResponse(response);
  return user;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  refetchUser,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="fixed w-full h-full bg-white flex justify-center items-center">
        <CoolSpinner />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
