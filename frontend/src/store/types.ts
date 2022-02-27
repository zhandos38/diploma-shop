export interface IRootState {
  version: number;
}

export interface IDataProvider<T> {
  currentPage: number;
  records: Array<T>;
  totalItems: number;
  totalPages: number;
}

export interface IDataTableEvent {
  sortField: string | null;
  sortOrder: number;
  rows: number;
  first: number;
  filters: any;
  page?: number;
}

export interface IStatus {
  value: string;
  label: string;
}
