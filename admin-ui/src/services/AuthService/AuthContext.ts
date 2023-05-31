import React from "react";
import {AuthService} from "./AuthService";
import { AuthInfo } from "./types";

const authInfo: AuthInfo = {
  userInfo: {},
  hasRole: AuthService.hasRole,
  logout: AuthService.doLogout,
};

export const AuthContext = React.createContext(authInfo);


