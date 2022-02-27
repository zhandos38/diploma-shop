import { GetterTree } from "vuex";
import { IUserState, IUser } from "@/store/user/state";

import { IDataProvider, IRootState } from "@/store/types";

export enum UserGetters {
  GET_ALL = "GET_ALL_USER",
  GET_CURRENT = "GET_CURRENT_USER",
  GET_DATA_PROVIDER = "GET_DATA_PROVIDER_USER",
}

export const getters: GetterTree<IUserState, IRootState> = {
  [UserGetters.GET_ALL](state): IUser[] {
    return state.users;
  },
  [UserGetters.GET_CURRENT](state): IUser {
    return state.user;
  },
  [UserGetters.GET_DATA_PROVIDER](state): IDataProvider<IUser> {
    return state.dataProvider;
  },
};
