import { IDataProvider } from "@/store/types";

export interface IUser {
  id?: number;
  username: string;
  fullName: string;
  password: string;
  role: string;
  status: number;
}

export interface IUserState {
  user: IUser;
  users: IUser[];
  dataProvider: IDataProvider<IUser>;
}

export enum UserStatuses {
  IN_ACTIVE = 0,
  ACTIVE = 1,
}

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

export enum UserRoles {
  ADMIN = "admin",
  DIRECTOR = "director",
  WAITER = "waiter",
  MANAGER = "manager",
}

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

export const state: IUserState = {
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
