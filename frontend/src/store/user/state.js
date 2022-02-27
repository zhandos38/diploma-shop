export var UserStatuses;
(function (UserStatuses) {
    UserStatuses[UserStatuses["IN_ACTIVE"] = 0] = "IN_ACTIVE";
    UserStatuses[UserStatuses["ACTIVE"] = 1] = "ACTIVE";
})(UserStatuses || (UserStatuses = {}));
export const userStatuses = [
    {
        value: UserStatuses.IN_ACTIVE,
        label: "Отключен",
    },
    {
        value: UserStatuses.ACTIVE,
        label: "Активный",
    },
];
export var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["DIRECTOR"] = "director";
    UserRoles["WAITER"] = "waiter";
    UserRoles["MANAGER"] = "manager";
})(UserRoles || (UserRoles = {}));
export const userRoles = [
    {
        value: UserRoles.WAITER,
        label: "Офицант",
    },
    {
        value: UserRoles.MANAGER,
        label: "Менеджер",
    },
];
export const state = {
    user: {
        username: "",
        fullName: "",
        password: "",
        role: "",
        status: 0,
    },
    users: [],
    dataProvider: {
        currentPage: 0,
        records: [],
        totalItems: 0,
        totalPages: 0,
    },
};
//# sourceMappingURL=state.js.map