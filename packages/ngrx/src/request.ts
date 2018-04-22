import { ensureStateMetadata } from './internals';
import { ApiResponseInfo } from './symbols';

export function ApiRequest(options: ApiResponseInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target.constructor);

        meta.requests[name] = {
            response: options,
            fn: name
        }
    };
}
