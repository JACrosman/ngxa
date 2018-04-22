import { ensureStateMetadata } from './internals';
import { ApiRequestInfo } from './symbols';

export function ApiRequest(options: ApiRequestInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(target);
        const handlers = target[name]();

        // Build action types
        const action = `[${meta.name}] ${name}`;
        const startAction = `${action} start`;
        const successAction = `${action} sucesss`;
        const failureAction = `${action} failure`;

        // Build start action
        meta.requests[startAction] = {
            name,
            request: options,
            handler: handlers.start
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
