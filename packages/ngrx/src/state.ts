// import { ensureStateMetadata } from './internals';

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

export function ApiState<T>(options: ApiOptions<T>) {
    return function(target: any) {

    };
}