export interface IPagination<T, K = T> {
    page: number;
    limit: number;
    total: number;
    orderBy?: "asc" | "desc";
    where?: Partial<Record<keyof T, any>>;
    data: K[];
}