export type ApiMethod =
| 'GET'
| 'CREATE'
| 'PUT'
| 'DELETE';

export interface ApiResponseInfo {
    path?: string;
    method?: ApiMethod;
}