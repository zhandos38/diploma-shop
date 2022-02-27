export var ProductTypes;
(function (ProductTypes) {
    ProductTypes[ProductTypes["PRODUCT"] = 0] = "PRODUCT";
    ProductTypes[ProductTypes["INGREDIENT"] = 1] = "INGREDIENT";
    ProductTypes[ProductTypes["SEMI_MANUFACTURES"] = 2] = "SEMI_MANUFACTURES";
    ProductTypes[ProductTypes["DISHES"] = 3] = "DISHES";
})(ProductTypes || (ProductTypes = {}));
export const productTypes = [
    { value: ProductTypes.PRODUCT, label: "Товары" },
    { value: ProductTypes.INGREDIENT, label: "Игредиенты" },
    { value: ProductTypes.SEMI_MANUFACTURES, label: "Полуфабрикаты" },
    { value: ProductTypes.DISHES, label: "Тех. карты" },
];
export var ProductPartialWriteOffs;
(function (ProductPartialWriteOffs) {
    ProductPartialWriteOffs[ProductPartialWriteOffs["ROUND"] = 0] = "ROUND";
    ProductPartialWriteOffs[ProductPartialWriteOffs["NOT_ROUND"] = 1] = "NOT_ROUND";
})(ProductPartialWriteOffs || (ProductPartialWriteOffs = {}));
export const productPartialWriteOffs = [
    { value: ProductPartialWriteOffs.ROUND, label: "Округлять" },
    { value: ProductPartialWriteOffs.NOT_ROUND, label: "Без округления" },
];
export var ProductUnits;
(function (ProductUnits) {
    ProductUnits[ProductUnits["P"] = 0] = "P";
    ProductUnits[ProductUnits["KG"] = 1] = "KG";
    ProductUnits[ProductUnits["L"] = 2] = "L";
})(ProductUnits || (ProductUnits = {}));
export const productUnits = [
    { value: ProductUnits.P, label: "Шт." },
    { value: ProductUnits.KG, label: "Кг" },
    { value: ProductUnits.L, label: "Л" },
];
export const state = {
    product: {
        name: "",
        barcode: "",
        quantity: 0,
        priceIn: 0,
        priceRetail: 0,
        totalCost: 0,
        isWeight: false,
        isNonStock: false,
        status: 0,
    },
    products: [],
    dataProvider: {
        currentPage: 0,
        records: [],
        totalItems: 0,
        totalPages: 0,
    },
};
//# sourceMappingURL=state.js.map