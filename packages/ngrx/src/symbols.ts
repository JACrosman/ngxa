import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export interface ApiEntityState<T> extends EntityState<T> {
    collection?: T[];
    entityId?: string;
    loading?: boolean;
    loaded?: boolean;
}

export interface ApiOptions<T> {
    name: string;
    route: string;
    defaults?: Partial<T>;
    subRoutes?: string[];
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

export type ActionType<T extends Action = Action> = { new (...args: any[]): T };
