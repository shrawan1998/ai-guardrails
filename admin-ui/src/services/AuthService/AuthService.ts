import  Keycloak from "keycloak-js";
import { MIN_VALIDITY_TO_REFRESH } from "./constants";
import { CurrentAuthenticatedUser, KeyCloakInitOptions } from "./types";

// keycloak init options for - localhost
const initOptions: KeyCloakInitOptions = {
  url: import.meta.env.VITE_KEYCLOAK_URI,
  realm:import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
  onLoad: "login-required"
};

// eslint-disable-next-line no-underscore-dangle
const _kc: Keycloak = new Keycloak(initOptions);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: () => {}) => {
  _kc.init({ onLoad: initOptions.onLoad, checkLoginIframe: false }).then(() => {
    onAuthenticatedCallback();
  });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: () => {}) =>
  _kc.updateToken(MIN_VALIDITY_TO_REFRESH).then(successCallback).catch(doLogout);

const getUserInfo = () => _kc.loadUserProfile();
const getResourceAccess = () => _kc.resourceAccess;
const getUserRoles = () => _kc.realmAccess?.roles ?? [];
const getParsedToken = () => _kc.tokenParsed;
const getCurrentUser = async () => (await _kc.loadUserInfo()) as Promise<CurrentAuthenticatedUser>;

const hasRole = (roles: Array<string>) => roles.some((role) => _kc.hasRealmRole(role));

export const AuthService = {
  doLogin,
  doLogout,
  initKeycloak,
  isLoggedIn,
  hasRole,
  getCurrentUser,
  getResourceAccess,
  getParsedToken,
  getToken,
  getUserInfo,
  getUserRoles,
  updateToken
};
