import { createEntityAdapter } from '@ngrx/entity';

import { ensureStateMetadata } from './internals';
import { ApiRequest } from './request';
import { ApiOptions } from './symbols';
import { query, get, create, update, remove } from './handlers';

export function ApiState<T>(options: ApiOptions<T>) {
    return function(target: any) {
        const metadata = ensureStateMetadata(target);

        metadata.name = options.name;
        metadata.route = options.route;
        metadata.defaults = options.defaults;
        metadata.adapter = createEntityAdapter<T>();

        // Set handlers on the target class
        target.query = query.handler;
        target.get = get.handler;
        target.create = create.handler;
        target.update = update.handler;
        target.remove = remove.handler;

        // Initialize default requests
        console.log('init default api requests');
        ApiRequest(query.request)(target, 'query', null);
        ApiRequest(get.request)(target, 'get', null);
        ApiRequest(create.request)(target, 'create', null);
        ApiRequest(update.request)(target, 'update', null);
        ApiRequest(remove.request)(target, 'remove', null);
        console.log('end init default api requests');
    };
}
