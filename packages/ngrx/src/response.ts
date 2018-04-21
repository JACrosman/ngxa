import { ensureStateMetadata } from './internals';

export type ApiMethod =
    | 'GET'
    | 'CREATE'
    | 'PUT'
    | 'DELETE';

export interface ApiResponsetInfo {
    path?: string;
    method?: ApiMethod;
}

export function ApiResponse(options: ApiResponsetInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target.constructor);

    };
}
