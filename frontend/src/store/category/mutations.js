export var CategoryMutations;
(function (CategoryMutations) {
    CategoryMutations["SET_ONE"] = "SET_ONE_CATEGORY";
    CategoryMutations["SET_ALL"] = "SET_ALL_CATEGORY";
    CategoryMutations["SET_LAZY_DATA"] = "SET_LAZY_DATA_CATEGORY";
})(CategoryMutations || (CategoryMutations = {}));
export const mutations = {
    [CategoryMutations.SET_ONE](state, payload) {
        state.category = payload;
    },
    [CategoryMutations.SET_ALL](state, payload) {
        state.categories = payload;
    },
    [CategoryMutations.SET_LAZY_DATA](state, payload) {
        state.dataProvider = payload;
    },
};
//# sourceMappingURL=mutations.js.map