import { ensureStateMetadata } from './internals';

export interface ApiRequestInfo {
}

export function ApiRequest(options?: ApiRequestInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target.constructor);

    };
}
