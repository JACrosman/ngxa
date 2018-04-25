import { ensureStateMetadata, createRequestAction } from './internals';
import { ApiRequestInfo } from './symbols';

export function ApiRequest(options: ApiRequestInfo) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = ensureStateMetadata(options.name ? target.constructor : target);
        const handlers = target[name](meta.idSelector);
        const stateName = meta.name || options.name;

        // Build action types
        const startAction = createRequestAction(stateName, name, 'start');
        const successAction = createRequestAction(stateName, name, 'success');
        const failureAction = createRequestAction(stateName, name, 'failure');

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
