import { CategoryMutations } from "@/store/category/mutations";
import { baseApi, getUrlAddress } from "@/store/config";
export var CategoryActions;
(function (CategoryActions) {
    CategoryActions["CREATE_ITEM"] = "CREAT_ITEM_CATEGORY";
    CategoryActions["FETCH_ONE"] = "FETCH_ONE_CATEGORY";
    CategoryActions["FETCH_ALL"] = "FETCH_ALL_CATEGORY";
    CategoryActions["FETCH_LAZY_DATA"] = "FETCH_LAZY_DATA_CATEGORY";
    CategoryActions["UPDATE_ITEM"] = "UPDATE_ITEM_CATEGORY";
    CategoryActions["DELETE_ITEM"] = "DELETE_ITEM_CATEGORY";
    CategoryActions["SET_ITEM"] = "SET_ITEM_CATEGORY";
})(CategoryActions || (CategoryActions = {}));
const routeName = `category`;
export const actions = {
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
    [CategoryActions.CREATE_ITEM]({ commit, dispatch }, payload) {
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
    [CategoryActions.UPDATE_ITEM]({ dispatch }, payload) {
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
//# sourceMappingURL=actions.js.map