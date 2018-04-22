import { ensureStateMetadata } from './internals';
import { ApiOptions } from './symbols';
import { query, get, create, update, remove } from './handlers';

export function ApiState<T>(options: ApiOptions<T>) {
    return function(target: any) {
        const metadata = ensureStateMetadata(target);

        metadata.name = options.name;
        metadata.route = options.route;
        metadata.defaults = options.defaults;

        metadata.requests['query'] = query;
        metadata.requests['get'] = get;
        metadata.requests['create'] = create;
        metadata.requests['update'] = update;
        metadata.requests['remove'] = remove;
    };
}
