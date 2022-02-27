export var ProductGetters;
(function (ProductGetters) {
    ProductGetters["GET_ALL"] = "GET_ALL_PRODUCT";
    ProductGetters["GET_CURRENT"] = "GET_CURRENT_PRODUCT";
    ProductGetters["GET_DATA_PROVIDER"] = "GET_DATA_PROVIDER_PRODUCT";
})(ProductGetters || (ProductGetters = {}));
export const getters = {
    [ProductGetters.GET_ALL](state) {
        return state.products;
    },
    [ProductGetters.GET_CURRENT](state) {
        return state.product;
    },
    [ProductGetters.GET_DATA_PROVIDER](state) {
        return state.dataProvider;
    },
};
//# sourceMappingURL=getters.js.map