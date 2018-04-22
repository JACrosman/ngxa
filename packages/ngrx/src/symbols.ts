import { EntityState } from '@ngrx/entity';

export interface ApiEntityState<T> extends EntityState<T> {
    collection?: T[];
    entityId?: string;
    loading?: boolean;
    loaded?: boolean;
}

export interface ApiOptions<T> {
    name: string;
    route: string;
    defaults: Partial<T>;
}

export type ApiMethod =
| 'GET'
| 'CREATE'
| 'PUT'
| 'DELETE';

export interface ApiRequestInfo {
    name?: string;
    path?: string;
    method?: string;
    options?: any;
}

export interface ApiRequestHandler {
    path?: string;
    info?: ApiRequestInfo;
    data: any;
}
