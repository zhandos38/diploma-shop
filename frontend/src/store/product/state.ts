import { IDataProvider } from "@/store/types";

export interface IProduct {
  id?: number;
  name: string;
  barcode: string;
  quantity: number;
  categoryId?: number | null;
  workshopId?: number | null;
  photo?: string;
  color?: string;
  priceIn: number;
  priceRetail: number;
  totalCost: number;
  isWeight: boolean;
  isNonStock: boolean;
  status: number;
  loosesClear?: number;
  loosesCook?: number;
  loosesFry?: number;
  loosesStew?: number;
  loosesBake?: number;
  weight?: number;
  partialWriteOff?: number;
  cookingMinutes?: number;
  cookingSeconds?: number;
}

export interface IProductState {
  product: IProduct;
  products: IProduct[];
  dataProvider: IDataProvider<IProduct>;
}

export enum ProductTypes {
  PRODUCT = 0,
  INGREDIENT = 1,
  SEMI_MANUFACTURES = 2,
  DISHES = 3,
}

export const productTypes = [
  { value: ProductTypes.PRODUCT, label: "Товары" },
  { value: ProductTypes.INGREDIENT, label: "Игредиенты" },
  { value: ProductTypes.SEMI_MANUFACTURES, label: "Полуфабрикаты" },
  { value: ProductTypes.DISHES, label: "Тех. карты" },
];

export enum ProductPartialWriteOffs {
  ROUND = 0,
  NOT_ROUND = 1,
}

export const productPartialWriteOffs = [
  { value: ProductPartialWriteOffs.ROUND, label: "Округлять" },
  { value: ProductPartialWriteOffs.NOT_ROUND, label: "Без округления" },
];

export enum ProductUnits {
  P = 0,
  KG = 1,
  L = 2,
}

export const productUnits = [
  { value: ProductUnits.P, label: "Шт." },
  { value: ProductUnits.KG, label: "Кг" },
  { value: ProductUnits.L, label: "Л" },
];

export const state: IProductState = {
  product: {
    name: "",
    barcode: "",
    quantity: 0,
    priceIn: 0,
    priceRetail: 0,
    totalCost: 0,
    isWeight: false,
    isNonStock: false,
    status: 0,
  },
  products: [],
  dataProvider: {
    currentPage: 0,
    records: [],
    totalItems: 0,
    totalPages: 0,
  },
};

export interface IComponents {
  id: number | null;
  componentId: number | null;
  isLoosesClear: boolean;
  loosesClear: number;
  isLoosesCook: boolean;
  loosesCook: number;
  isLoosesFry: boolean;
  loosesFry: number;
  isLoosesStew: boolean;
  loosesStew: number;
  isLoosesBake: boolean;
  loosesBake: number;
  brutto: number;
  netto: number;
  priceIn: number;
  price: number;
}
