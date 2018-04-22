import { ApiRequestInfo } from './symbols';
import { EntityAdapter } from '@ngrx/entity';

export const NGRA_STATE_META = '__ngra__state__meta__';

export interface StateMetdata {
    requests: RequestMetaMap;
    name: string;
    route: string;
    defaults: any;
    adapter: EntityAdapter<any>;
}

export interface RequestMeta {
    request?: ApiRequestInfo;
    handler: (state, action) => any;
}

export interface RequestMetaMap {
    [type: string]: RequestMeta;
}

export function ensureStateMetadata(target: any): StateMetdata {
    if (!target.hasOwnProperty(NGRA_STATE_META)) {
        const defaultMetadata: StateMetdata = {
            requests: {},
            defaults: {},
            name: null,
            route: null,
            adapter: null
        };
        Object.defineProperty(target, NGRA_STATE_META, { value: defaultMetadata });
    }
    return target[NGRA_STATE_META];
}