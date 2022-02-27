import { GetterTree } from "vuex";
import { IProductState, IProduct } from "@/store/product/state";

import { IDataProvider, IRootState } from "@/store/types";

export enum ProductGetters {
  GET_ALL = "GET_ALL_PRODUCT",
  GET_CURRENT = "GET_CURRENT_PRODUCT",
  GET_DATA_PROVIDER = "GET_DATA_PROVIDER_PRODUCT",
}

export const getters: GetterTree<IProductState, IRootState> = {
  [ProductGetters.GET_ALL](state): IProduct[] {
    return state.products;
  },
  [ProductGetters.GET_CURRENT](state): IProduct {
    return state.product;
  },
  [ProductGetters.GET_DATA_PROVIDER](state): IDataProvider<IProduct> {
    return state.dataProvider;
  },
};
