export var UserGetters;
(function (UserGetters) {
    UserGetters["GET_ALL"] = "GET_ALL_USER";
    UserGetters["GET_CURRENT"] = "GET_CURRENT_USER";
    UserGetters["GET_DATA_PROVIDER"] = "GET_DATA_PROVIDER_USER";
})(UserGetters || (UserGetters = {}));
export const getters = {
    [UserGetters.GET_ALL](state) {
        return state.users;
    },
    [UserGetters.GET_CURRENT](state) {
        return state.user;
    },
    [UserGetters.GET_DATA_PROVIDER](state) {
        return state.dataProvider;
    },
};
//# sourceMappingURL=getters.js.map