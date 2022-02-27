import { MutationTree } from "vuex";
import { IUserState, IUser } from "@/store/user/state";
import { IDataProvider } from "@/store/types";

export enum UserMutations {
  SET_ONE = "SET_ONE_USER",
  SET_AUTH_DATA = "SET_ONE_USER",
  SET_ALL = "SET_ALL_USER",
  SET_LAZY_DATA = "SET_LAZY_DATA_USER",
}

export const mutations: MutationTree<IUserState> = {
  [UserMutations.SET_ONE](state, payload: IUser) {
    state.user = payload;
  },
  [UserMutations.SET_AUTH_DATA](state, payload: IUser) {
    state.user = payload;

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem(
      "user_id",
      payload.id ? payload.id.toString() : "null"
    );
    localStorage.setItem("user_fullName", payload.fullName);
    localStorage.setItem("user_role", payload.role);
  },
  [UserMutations.SET_ALL](state, payload: IUser[]) {
    state.users = payload;
  },
  [UserMutations.SET_LAZY_DATA](state, payload: IDataProvider<IUser>) {
    state.dataProvider = payload;
  },
};
