import { ActionTree } from "vuex";

import { IProductState, IProduct } from "@/store/product/state";
import { IRootState } from "@/store/types";
import { ProductMutations } from "@/store/product/mutations";
import { baseApi, getUrlAddress } from "@/store/config";

export enum ProductActions {
  CREATE_ITEM = "CREAT_ITEM_PRODUCT",
  FETCH_ALL = "FETCH_ALL_PRODUCT",
  UPDATE_ITEM = "UPDATE_ITEM_PRODUCT",
  DELETE_ITEM = "DELETE_ITEM_PRODUCT",
  SET_ITEM = "SET_ITEM_PRODUCT",
  FETCH_ONE = "FETCH_ONE_PRODUCT",
  FETCH_LAZY_DATA = "FETCH_LAZY_DATA_PRODUCT",
}

export enum ProductComponentActions {
  DELETE_ITEM = "DELETE_ITEM_PRODUCT_COMPONENT",
}

const routeName = `product`;

export const actions: ActionTree<IProductState, IRootState> = {
  [ProductActions.FETCH_LAZY_DATA]({ commit }, params) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/data-provider`, {
          params: params,
        })
        .then((response) => {
          commit(ProductMutations.SET_LAZY_DATA, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [ProductActions.FETCH_ALL]({ commit }, params) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/index`, {
          params: params,
        })
        .then((response) => {
          commit(ProductMutations.SET_ALL, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [ProductActions.FETCH_ONE]({ commit }, id) {
    return new Promise((resolve, reject) => {
      baseApi
        .get(`${getUrlAddress(routeName)}/get-by-id?id=${id}`)
        .then((response) => {
          commit(ProductMutations.SET_ONE, response.data);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [ProductActions.CREATE_ITEM]({ commit, dispatch }, payload: IProduct) {
    return new Promise((resolve, reject) => {
      baseApi
        .post(`${getUrlAddress(routeName)}/create`, payload)
        .then(() => {
          commit(ProductMutations.SET_ONE, payload);
          dispatch(ProductActions.FETCH_ALL);
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  [ProductActions.UPDATE_ITEM]({ dispatch }, payload: IProduct) {
    return new Promise((resolve, reject) => {
      baseApi
        .put(`${getUrlAddress(routeName)}/update?id=${payload.id}`, {
          data: payload,
        })
        .then(() => {
          dispatch(ProductActions.FETCH_ALL);
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  [ProductActions.SET_ITEM]({ commit }, payload) {
    commit(ProductMutations.SET_ONE, payload);
  },
  [ProductActions.DELETE_ITEM]({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      baseApi
        .delete(`${getUrlAddress(routeName)}/delete?id=${payload.id}`)
        .then(() => {
          dispatch(ProductActions.FETCH_LAZY_DATA, payload.lazyParams);
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  [ProductComponentActions.DELETE_ITEM]({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      baseApi
        .delete(`${getUrlAddress(routeName)}/component-delete?id=${payload.id}`)
        .then(() => {
          resolve(true);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
