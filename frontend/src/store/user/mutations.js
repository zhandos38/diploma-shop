export var UserMutations;
(function (UserMutations) {
    UserMutations["SET_ONE"] = "SET_ONE_USER";
    UserMutations["SET_AUTH_DATA"] = "SET_ONE_USER";
    UserMutations["SET_ALL"] = "SET_ALL_USER";
    UserMutations["SET_LAZY_DATA"] = "SET_LAZY_DATA_USER";
})(UserMutations || (UserMutations = {}));
export const mutations = {
    [UserMutations.SET_ONE](state, payload) {
        state.user = payload;
    },
    [UserMutations.SET_AUTH_DATA](state, payload) {
        state.user = payload;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user_id", payload.id ? payload.id.toString() : "null");
        localStorage.setItem("user_fullName", payload.fullName);
        localStorage.setItem("user_role", payload.role);
    },
    [UserMutations.SET_ALL](state, payload) {
        state.users = payload;
    },
    [UserMutations.SET_LAZY_DATA](state, payload) {
        state.dataProvider = payload;
    },
};
//# sourceMappingURL=mutations.js.map