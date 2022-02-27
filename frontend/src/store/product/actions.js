import { ProductMutations } from "@/store/product/mutations";
import { baseApi, getUrlAddress } from "@/store/config";
export var ProductActions;
(function (ProductActions) {
    ProductActions["CREATE_ITEM"] = "CREAT_ITEM_PRODUCT";
    ProductActions["FETCH_ALL"] = "FETCH_ALL_PRODUCT";
    ProductActions["UPDATE_ITEM"] = "UPDATE_ITEM_PRODUCT";
    ProductActions["DELETE_ITEM"] = "DELETE_ITEM_PRODUCT";
    ProductActions["SET_ITEM"] = "SET_ITEM_PRODUCT";
    ProductActions["FETCH_ONE"] = "FETCH_ONE_PRODUCT";
    ProductActions["FETCH_LAZY_DATA"] = "FETCH_LAZY_DATA_PRODUCT";
})(ProductActions || (ProductActions = {}));
export var ProductComponentActions;
(function (ProductComponentActions) {
    ProductComponentActions["DELETE_ITEM"] = "DELETE_ITEM_PRODUCT_COMPONENT";
})(ProductComponentActions || (ProductComponentActions = {}));
const routeName = `product`;
export const actions = {
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
    [ProductActions.CREATE_ITEM]({ commit, dispatch }, payload) {
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
    [ProductActions.UPDATE_ITEM]({ dispatch }, payload) {
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
//# sourceMappingURL=actions.js.map