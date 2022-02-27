import { MutationTree } from "vuex";
import { ICategoryState, ICategory } from "@/store/category/state";
import { IDataProvider } from "@/store/types";

export enum CategoryMutations {
  SET_ONE = "SET_ONE_CATEGORY",
  SET_ALL = "SET_ALL_CATEGORY",
  SET_LAZY_DATA = "SET_LAZY_DATA_CATEGORY",
}

export const mutations: MutationTree<ICategoryState> = {
  [CategoryMutations.SET_ONE](state, payload: ICategory) {
    state.category = payload;
  },
  [CategoryMutations.SET_ALL](state, payload: ICategory[]) {
    state.categories = payload;
  },
  [CategoryMutations.SET_LAZY_DATA](state, payload: IDataProvider<ICategory>) {
    state.dataProvider = payload;
  },
};
