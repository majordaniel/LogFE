export const APP_NAME = "Izigo";
export const TOKEN_HASH = "izigo-api-token-v1";
export const USER_HASH = "izigo-userprofile-token-v1";
export const USER_TYPE_HASH = "izigo-usertype-token-v1";
let dispatch = () => null,
  TOKEN,
  USER = {};
export const notifier = (type, message) =>
  setAppState({ alert: { showAlert: true, type, message } });
export const showAlert = (type, message) =>
  setAppState({ alert: { showAlert: true, type, message } });
export const closeAlert = () => setAppState({ alert: { showAlert: false } });
export const showLoading = () => setAppState({ isLoading: true });
export const hideLoading = () => setAppState({ isLoading: false });
export const setAppState = (state = {}) =>
  dispatch({ type: "STATE_CHANGE", payload: state });

export const setToken = (token = "") => {
  TOKEN = token;
  setAppState({ token, isLoggedIn: true });
  localStorage.setItem(TOKEN_HASH, token);
};

export const setUser = (user = {}, userType = "admin") => {
  USER = user;
  setAppState({ user, userType });
  localStorage.setItem(USER_HASH, JSON.stringify(user));
  localStorage.setItem(USER_TYPE_HASH, userType);
};
export const setDispatch = (_dispatch) => (dispatch = _dispatch);
export const getToken = () => TOKEN;
export const getUser = () => USER;
export const isCompany = localStorage.getItem(USER_TYPE_HASH) === 'company';
