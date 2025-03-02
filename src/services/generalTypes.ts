export interface GenericResponse {
  status: string;
  message?: string;
  [x: string]: any;
}

export interface PaginationType {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  nextPage: any;
  previousPage: any;
  limit: number;
}
