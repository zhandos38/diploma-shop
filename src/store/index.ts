import { createStore } from "vuex";
import { IRootState } from "@/store/types";
import { product } from "./product";
import { category } from "./category";

export default createStore<IRootState>({
  state: {
    version: 0,
  },
  mutations: {},
  actions: {},
  modules: {
    product,
    category,
  },
});
