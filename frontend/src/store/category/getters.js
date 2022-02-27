export var CategoryGetters;
(function (CategoryGetters) {
    CategoryGetters["GET_ALL"] = "GET_ALL_CATEGORY";
    CategoryGetters["GET_CURRENT"] = "GET_CURRENT_CATEGORY";
    CategoryGetters["GET_DATA_PROVIDER"] = "GET_DATA_PROVIDER_CATEGORY";
})(CategoryGetters || (CategoryGetters = {}));
export const getters = {
    [CategoryGetters.GET_ALL](state) {
        return state.categories;
    },
    [CategoryGetters.GET_CURRENT](state) {
        return state.category;
    },
    [CategoryGetters.GET_DATA_PROVIDER](state) {
        return state.dataProvider;
    },
};
//# sourceMappingURL=getters.js.map