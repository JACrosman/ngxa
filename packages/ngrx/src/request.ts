import { ensureStateMetadata } from './internals';
import { ApiRequestInfo } from './symbols';

export function ApiRequest(options: ApiRequestInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target.constructor);

        meta.requests[name] = {
            request: options,
            action: `[${target.name}] ${name}`,
            handlers: target[name]()
        };
    };
}
