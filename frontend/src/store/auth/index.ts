import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { baseApi, getUrlAddress } from "@/store/config";
import { UserMutations } from "@/store/user/mutations";
import { UserActions } from "@/store/user/actions";
import { IUser } from "@/store/user/state";
import { UserGetters } from "@/store/user/getters";

export interface ILoaderState {
  isUserLoggedIn: boolean;
}

export enum AuthActions {
  SET_IS_LOGGED_IN = "SET_LOGIN",
  SIGNUP = "SIGNUP",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REFRESH_USER_IDENTITY = "REFRESH_USER_IDENTITY",
  CHECK = "CHECK",
}

export enum AuthMutations {
  CHANGE_IS_LOGGED_IN = "CHANGE_IS_LOGGED_IN",
  SET_AUTH_DATA = "SET_AUTH_USER",
  SET_USER_IDENTITY = "SET_USER_IDENTITY",
}

export enum AuthGetters {
  GET_FULL_NAME = "GET_USER_FULL_NAME",
  GET_ROLE = "GET_USER_ROLE",
  GET_IS_AUTHENTICATED = "GET_IS_AUTHENTICATED",
  GET_USER_ID = "GET_USER_ID",
  GET_USER_IDENTITY = "GET_USER_IDENTITY",
}

const routeName = `auth`;

interface ILoginResponse {
  user: IUser;
  token: string;
}
export const auth: Module<ILoaderState, IRootState> = {
  actions: {
    [AuthActions.SIGNUP]({ commit }, params) {
      return new Promise((resolve, reject) => {
        baseApi
          .post(`${getUrlAddress(routeName)}/signup`, params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
    [AuthActions.LOGIN]({ commit }, params) {
      return new Promise((resolve, reject) => {
        baseApi
          .post(`${getUrlAddress(routeName)}/login`, params)
          .then((response) => {
            commit(AuthMutations.SET_AUTH_DATA, response.data);
            commit(AuthMutations.CHANGE_IS_LOGGED_IN, true);
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [AuthActions.LOGOUT]({ commit }) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      commit(AuthMutations.CHANGE_IS_LOGGED_IN, false);
    },
    [AuthActions.REFRESH_USER_IDENTITY]({ commit }, userId) {
      return new Promise((resolve, reject) => {
        console.log(userId);
        baseApi
          .get(`${getUrlAddress(routeName)}/refresh-identity?id=${userId}`)
          .then((response) => {
            commit(AuthMutations.SET_USER_IDENTITY, response.data);
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [AuthActions.CHECK]() {
      return new Promise((resolve, reject) => {
        baseApi
          .get(`${getUrlAddress(routeName)}/check`)
          .then(async (response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  mutations: {
    [AuthMutations.CHANGE_IS_LOGGED_IN](state, status) {
      state.isUserLoggedIn = status;
    },
    [AuthMutations.SET_USER_IDENTITY](state, payload: IUser) {
      localStorage.setItem("user", JSON.stringify(payload));
    },
    [AuthMutations.SET_AUTH_DATA](state, payload: ILoginResponse) {
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
    },
  },
  getters: {
    [AuthGetters.GET_USER_IDENTITY](): IUser | null {
      const user = localStorage.getItem("user");
      if (!user) {
        return null;
      }

      return JSON.parse(user);
    },
    [AuthGetters.GET_USER_ID](): number | null {
      const user = localStorage.getItem("user");
      if (!user) {
        return null;
      }

      return JSON.parse(user).id;
    },
    [AuthGetters.GET_ROLE](): string | null {
      const user = localStorage.getItem("user");
      if (!user) {
        return null;
      }

      return JSON.parse(user).role;
    },
    [AuthGetters.GET_FULL_NAME](): string | null {
      const user = localStorage.getItem("user");
      if (!user) {
        return null;
      }

      return JSON.parse(user).fullName;
    },
    [AuthGetters.GET_IS_AUTHENTICATED](): boolean {
      const user = localStorage.getItem("user");
      return !!user;
    },
  },
  state: {
    isUserLoggedIn: false,
  },
};
