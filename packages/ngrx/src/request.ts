import { ensureStateMetadata } from './internals';
import { ApiRequestInfo } from './symbols';

export function ApiRequest(options: ApiRequestInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target.constructor);
        const handlers = target[name]();

        // Build action types
        const action = `[${target.name}] ${name}`;
        const startAction = `${action} start`;
        const successAction = `${action} sucesss`;
        const failureAction = `${action} failure`;

        // Build start action
        meta.requests[startAction] = {
            request: options,
            handler: handlers.start
        };

        // Build success action
        meta.requests[successAction] = {
            handler: handlers.succuess
        };

        // Build failure action
        meta.requests[failureAction] = {
            handler: handlers.failure
        };
    };
}
