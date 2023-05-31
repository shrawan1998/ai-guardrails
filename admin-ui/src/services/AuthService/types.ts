import { KeycloakConfig, KeycloakOnLoad, KeycloakProfile } from "keycloak-js";

export interface KeyCloakInitOptions extends KeycloakConfig {
  url?: string;
  realm: string;
  clientId: string;
  onLoad: KeycloakOnLoad | undefined;
}

export interface AuthInfo {
  userInfo: user;
  hasRole: (roles: Array<string>) => {};
  logout: () => {};
}

export interface user {
  emailVerified?: string;
  username?: string;
}

export interface UserProfile extends KeycloakProfile {}

export type CurrentAuthenticatedUser = {
  sub: string;
  groups: string[];
  email: string;
  email_verified: string;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
};
