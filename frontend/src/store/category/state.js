export var CategoryTypes;
(function (CategoryTypes) {
    CategoryTypes[CategoryTypes["PRODUCT_AND_DISHES"] = 0] = "PRODUCT_AND_DISHES";
    CategoryTypes[CategoryTypes["INGREDIENT"] = 1] = "INGREDIENT";
})(CategoryTypes || (CategoryTypes = {}));
export const state = {
    category: {
        name: "",
    },
    categories: [],
    dataProvider: {
        currentPage: 0,
        records: [],
        totalItems: 0,
        totalPages: 0,
    },
};
//# sourceMappingURL=state.js.map