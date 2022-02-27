import { MutationTree } from "vuex";
import { IProductState, IProduct } from "@/store/product/state";
import { IDataProvider } from "@/store/types";

export enum ProductMutations {
  SET_ONE = "SET_ONE_PRODUCT",
  SET_ALL = "SET_ALL_PRODUCT",
  SET_LAZY_DATA = "SET_LAZY_DATA_PRODUCT",
}

export const mutations: MutationTree<IProductState> = {
  [ProductMutations.SET_ONE](state, payload: IProduct) {
    state.product = payload;
  },
  [ProductMutations.SET_ALL](state, payload: IProduct[]) {
    state.products = payload;
  },
  [ProductMutations.SET_LAZY_DATA](state, payload: IDataProvider<IProduct>) {
    state.dataProvider = payload;
  },
};
