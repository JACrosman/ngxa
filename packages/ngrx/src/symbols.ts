export interface ApiEntityState<T> {
    collection?: T[];
    entityId?: string;
    loading?: boolean;
    loaded?: boolean;
}

export interface ApiOptions<T> {
    name: string;
    route: string;
    defaults: T;
}

export type ApiMethod =
| 'GET'
| 'CREATE'
| 'PUT'
| 'DELETE';

export interface ApiResponseInfo {
    path?: string;
    method?: ApiMethod;
}