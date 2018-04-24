import { createEntityAdapter } from '@ngrx/entity';

import { ensureStateMetadata } from './internals';
import { ApiRequest } from './request';
import { ApiOptions } from './symbols';
import { query, get, post, put, remove } from './handlers';

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
        target.post = post.handler;
        target.put = put.handler;
        target.remove = remove.handler;

        // Initialize default requests
        ApiRequest(query.request)(target, 'query', null);
        ApiRequest(get.request)(target, 'get', null);
        ApiRequest(post.request)(target, 'post', null);
        ApiRequest(put.request)(target, 'put', null);
        ApiRequest(remove.request)(target, 'remove', null);
    };
}
