import { Module } from "vuex";

import { IRootState } from "@/store/types";
import { getters } from "@/store/category/getters";
import { actions } from "@/store/category/actions";
import { mutations } from "@/store/category/mutations";
import { ICategoryState, state } from "@/store/category/state";

export const category: Module<ICategoryState, IRootState> = {
  actions,
  mutations,
  state,
  getters,
};
