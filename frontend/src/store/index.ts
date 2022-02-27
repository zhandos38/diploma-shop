import { createStore } from "vuex";
import { IRootState } from "@/store/types";
import { product } from "./product";
import { category } from "./category";
import { user } from "./user";
import { auth } from "./auth";

export const store = createStore<IRootState>({
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