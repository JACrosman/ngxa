import { ensureStateMetadata } from './internals';
import { ApiResponseInfo } from './symbols';

export function ApiResponse(options: ApiResponseInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target.constructor);

        meta.responses[name] = {
            response: options,
            fn: name
        }
    };
}
