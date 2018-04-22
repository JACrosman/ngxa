import { ensureStateMetadata } from './internals';
import { ApiRequestInfo } from './symbols';

export function ApiRequest(options: ApiRequestInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(options.name ? target.constructor : target);
        const handlers = target[name]();

        // Build action types
        const action = `[${meta.name || options.name}] ${name}`;
        const startAction = `${action} start`;
        const successAction = `${action} success`;
        const failureAction = `${action} failure`;

        // Build start action
        meta.requests[startAction] = {
            name,
            info: options,
            handler: handlers.start,
            request: handlers.request
        };

        // Build success action
        meta.requests[successAction] = {
            name,
            handler: handlers.success
        };

        // Build failure action
        meta.requests[failureAction] = {
            name,
            handler: handlers.failure
        };
    };
}
