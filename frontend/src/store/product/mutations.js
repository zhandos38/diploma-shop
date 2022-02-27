export var ProductMutations;
(function (ProductMutations) {
    ProductMutations["SET_ONE"] = "SET_ONE_PRODUCT";
    ProductMutations["SET_ALL"] = "SET_ALL_PRODUCT";
    ProductMutations["SET_LAZY_DATA"] = "SET_LAZY_DATA_PRODUCT";
})(ProductMutations || (ProductMutations = {}));
export const mutations = {
    [ProductMutations.SET_ONE](state, payload) {
        state.product = payload;
    },
    [ProductMutations.SET_ALL](state, payload) {
        state.products = payload;
    },
    [ProductMutations.SET_LAZY_DATA](state, payload) {
        state.dataProvider = payload;
    },
};
//# sourceMappingURL=mutations.js.map