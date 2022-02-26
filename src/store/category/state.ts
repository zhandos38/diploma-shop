import { IDataProvider } from "@/store/types";

export interface ICategory {
  id?: number;
  name: string;
  color?: string;
  img?: string;
  parentId?: string;
}

export interface ICategoryState {
  category: ICategory;
  categories: ICategory[];
  dataProvider: IDataProvider<ICategory>;
}

export enum CategoryTypes {
  PRODUCT_AND_DISHES = 0,
  INGREDIENT = 1,
}

export const state: ICategoryState = {
  category: {
    name: "",
  },
  categories: [],
  dataProvider: {
    currentPage: 0,
    records: [],
    totalItems: 0,
    totalPages: 0,
  },
};
