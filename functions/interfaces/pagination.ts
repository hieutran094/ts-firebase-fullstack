export interface IPaginationResponse<T> {
    limit: number;
    page: number;
    total: number;
    prevPage: number | null;
    nextPage: number | null;
    lastPage: number;
    data: T[];
  }