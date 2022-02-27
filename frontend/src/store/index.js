import { createStore } from "vuex";
import { product } from "./product";
import { category } from "./category";
import { user } from "./user";
import { auth } from "./auth";
export const store = createStore({
    state: {
        version: 0,
    },
    mutations: {},
    actions: {},
    modules: {
        user,
        auth,
        product,
        category,
    },
});
//# sourceMappingURL=index.js.map