import { Module } from "vuex";

import { IRootState } from "@/store/types";
import { getters } from "@/store/user/getters";
import { actions } from "@/store/user/actions";
import { mutations } from "@/store/user/mutations";
import { IUserState, state } from "@/store/user/state";

export const user: Module<IUserState, IRootState> = {
  actions,
  mutations,
  state,
  getters,
};
