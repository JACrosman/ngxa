import { ApiResponseInfo } from './symbols';

export const NGRA_STATE_META = '__ngra__state__meta__';

export interface StateMetdata {
    responses: {}
}

export interface ResponseMeta {
    response: ApiResponseInfo;
    fn: string;
}

export interface ResponseMetas {
    [type: string]: ResponseMeta;
}

export function ensureStateMetadata(target: any): StateMetdata {
    if (!target.hasOwnProperty(NGRA_STATE_META)) {
        const defaultMetadata: StateMetdata = { responses: {} };
        Object.defineProperty(target, NGRA_STATE_META, { value: defaultMetadata });
    }
    return target[NGRA_STATE_META];
}