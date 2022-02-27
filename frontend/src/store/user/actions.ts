import { ActionTree } from "vuex";

import { IUserState, IUser } from "@/store/user/state";
import { IRootState } from "@/store/types";
import { UserMutations } from "@/store/user/mutations";
import { baseApi, getUrlAddress } from "@/store/config";

export enum UserActions {
  CREATE_ITEM = "CREAT_ITEM_USER",
  FETCH_ONE = "FETCH_ONE_USER",
  FETCH_ALL = "FETCH_ALL_USER",
  FETCH_LAZY_DATA = "FETCH_LAZY_DATA_USER",
  UPDATE_ITEM = "UPDATE_ITEM_USER",
  DELETE_ITEM = "DELETE_ITEM_USER",
  SET_ITEM = "SET_ITEM_USER",
}

const routeName = `user`;

export const actions: ActionTree<IUserState, IRootState> = {
  [UserActions.FETCH_LAZY_DATA]({ commit }, params) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/data-provider`, {
          params: params,
        })
        .then((response) => {
          commit(UserMutations.SET_LAZY_DATA, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [UserActions.FETCH_ALL]({ commit }, params) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/index`, {
          params: params,
        })
        .then((response) => {
          commit(UserMutations.SET_ALL, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [UserActions.FETCH_ONE]({ commit }, id) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/get?id=${id}`)
        .then((response) => {
          commit(UserMutations.SET_ONE, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [UserActions.CREATE_ITEM]({ commit, dispatch }, payload: IUser) {
    return new Promise((resolve, reject) => {
      baseApi
        .post(`${getUrlAddress(routeName)}/create`, payload)
        .then(() => {
          commit(UserMutations.SET_ONE, payload);
          dispatch(UserActions.FETCH_ALL);
          resolve(true);
        })
        .catch(function (error) {
          console.log("Error: ", error);
          reject(error.response);
        });
    });
  },
  [UserActions.UPDATE_ITEM]({ dispatch }, payload: IUser) {
    return new Promise((resolve, reject) => {
      baseApi
        .put(`${getUrlAddress(routeName)}/update?id=${payload.id}`, {
          data: payload,
        })
        .then(() => {
          dispatch(UserActions.FETCH_ALL);
          resolve(true);
        })
        .catch(function (error) {
          console.log("Error: ", error);
          reject(error.response);
        });
    });
  },
  [UserActions.SET_ITEM]({ commit }, payload) {
    commit(UserMutations.SET_ONE, payload);
  },
  [UserActions.DELETE_ITEM]({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      baseApi
        .delete(`${getUrlAddress(routeName)}/delete?id=${payload}`)
        .then(() => {
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
