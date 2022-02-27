import { ActionTree } from "vuex";
import axios from "axios";

import { ICategoryState, ICategory } from "@/store/category/state";
import { IRootState } from "@/store/types";
import { CategoryMutations } from "@/store/category/mutations";
import {baseApi, getUrlAddress} from "@/store/config";

export enum CategoryActions {
  CREATE_ITEM = "CREAT_ITEM_CATEGORY",
  FETCH_ONE = "FETCH_ONE_CATEGORY",
  FETCH_ALL = "FETCH_ALL_CATEGORY",
  FETCH_LAZY_DATA = "FETCH_LAZY_DATA_CATEGORY",
  UPDATE_ITEM = "UPDATE_ITEM_CATEGORY",
  DELETE_ITEM = "DELETE_ITEM_CATEGORY",
  SET_ITEM = "SET_ITEM_CATEGORY",
}

const routeName = `category`;

export const actions: ActionTree<ICategoryState, IRootState> = {
  [CategoryActions.FETCH_LAZY_DATA]({ commit }, params) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/data-provider`, {
          params: params,
        })
        .then((response) => {
          commit(CategoryMutations.SET_LAZY_DATA, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [CategoryActions.FETCH_ALL]({ commit }, params) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/index`, {
          params: params,
        })
        .then((response) => {
          commit(CategoryMutations.SET_ALL, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [CategoryActions.FETCH_ONE]({ commit }, id) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/${id}`)
        .then((response) => {
          commit(CategoryMutations.SET_ONE, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [CategoryActions.CREATE_ITEM]({ commit, dispatch }, payload: ICategory) {
    return new Promise((resolve, reject) => {
      baseApi
        .post(`${getUrlAddress(routeName)}/create`, payload)
        .then(() => {
          commit(CategoryMutations.SET_ONE, payload);
          dispatch(CategoryActions.FETCH_ALL);
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  [CategoryActions.UPDATE_ITEM]({ dispatch }, payload: ICategory) {
    return new Promise((resolve, reject) => {
      baseApi
        .put(`${getUrlAddress(routeName)}/update?id=${payload.id}`, {
          data: payload,
        })
        .then(() => {
          dispatch(CategoryActions.FETCH_ALL);
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  [CategoryActions.SET_ITEM]({ commit }, payload) {
    commit(CategoryMutations.SET_ONE, payload);
  },
  [CategoryActions.DELETE_ITEM]({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      baseApi
        .delete(`${getUrlAddress(routeName)}/delete?id=${payload.id}`)
        .then(() => {
          dispatch(CategoryActions.FETCH_LAZY_DATA, payload.lazyParams);
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
