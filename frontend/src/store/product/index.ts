import { Module } from "vuex";

import { IRootState } from "@/store/types";
import { getters } from "@/store/product/getters";
import { actions } from "@/store/product/actions";
import { mutations } from "@/store/product/mutations";
import { IProductState, state } from "@/store/product/state";

export const product: Module<IProductState, IRootState> = {
  actions,
  mutations,
  state,
  getters,
};
