export interface PageModel<T> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    data: T[];
}
