import { ApiRequestInfo } from './symbols';

export const NGRA_STATE_META = '__ngra__state__meta__';

export interface StateMetdata {
    requests: RequestMetaMap;
    name: string;
    route: string;
    defaults: any;
}

export interface RequestMeta {
    request: ApiRequestInfo;
    action: string;
    handlers: {
        start: () => any,
        success: () => any,
        failure: () => any
    };
}

export interface RequestMetaMap {
    [type: string]: RequestMeta;
}

export function ensureStateMetadata(target: any): StateMetdata {
    if (!target.hasOwnProperty(NGRA_STATE_META)) {
        const defaultMetadata: StateMetdata = {
            requests: {},
            name: null,
            route: null,
            defaults: {}
        };
        Object.defineProperty(target, NGRA_STATE_META, { value: defaultMetadata });
    }
    return target[NGRA_STATE_META];
}