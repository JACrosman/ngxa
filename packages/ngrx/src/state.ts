import { ensureStateMetadata } from './internals';
import { ApiOptions } from './symbols';

export function ApiState<T>(options: ApiOptions<T>) {
    return function(target: any) {
        const metadata = ensureStateMetadata(target);
        
        metadata.name = options.name;
        metadata.route = options.route;
        metadata.defaults = options.defaults;
    };
}