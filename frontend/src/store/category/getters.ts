import { GetterTree } from "vuex";
import { ICategoryState, ICategory } from "@/store/category/state";

import { IDataProvider, IRootState } from "@/store/types";

export enum CategoryGetters {
  GET_ALL = "GET_ALL_CATEGORY",
  GET_CURRENT = "GET_CURRENT_CATEGORY",
  GET_DATA_PROVIDER = "GET_DATA_PROVIDER_CATEGORY",
}

export const getters: GetterTree<ICategoryState, IRootState> = {
  [CategoryGetters.GET_ALL](state): ICategory[] {
    return state.categories;
  },
  [CategoryGetters.GET_CURRENT](state): ICategory {
    return state.category;
  },
  [CategoryGetters.GET_DATA_PROVIDER](state): IDataProvider<ICategory> {
    return state.dataProvider;
  },
};
