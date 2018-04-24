
import { Observable } from 'rxjs/Observable';
import { EntityAdapter } from '@ngrx/entity';

import { ApiRequestInfo, ApiRequestHandler, ActionType } from './symbols';
import { ParamMap } from './service';

export const NGRA_STATE_META = '__ngra__state__meta__';

export interface StateMetdata {
    requests: RequestMetaMap;
    actions: ActionsMeta;
    name: string;
    route: string;
    defaults: any;
    adapter: EntityAdapter<any>;
}

export interface ActionMeta {
    action: ActionType;
    fn: string;
    type: string;
}

export type ActionsMeta = {
    [type: string]: ActionMeta;
};

export interface RequestMeta {
    name: string;
    info?: ApiRequestInfo;
    request?: (info?: ApiRequestHandler) => Observable<any>;
    handler?: (state, action, adapter: EntityAdapter<any>) => any;
}

export interface RequestMetaMap {
    [type: string]: RequestMeta;
}

export function ensureStateMetadata(target: any): StateMetdata {
    if (!target.hasOwnProperty(NGRA_STATE_META)) {
        const defaultMetadata: StateMetdata = {
            requests: {},
            actions: {},
            defaults: {},
            name: null,
            route: null,
            adapter: null
        };
        Object.defineProperty(target, NGRA_STATE_META, { value: defaultMetadata });
    }
    return target[NGRA_STATE_META];
}

export function generateUrl(info: ApiRequestInfo, route: string, params?: ParamMap) {
    let path = info.path;

    if (params) {
        Object.keys(params).forEach(param => { path = path.replace(`:${param}`, params[param]); });
    }

    return `${route}/${path}`;
}

export function createRequestAction(stateName: string, actionName: string, operation: string) {
    return `[${stateName}] ${actionName} ${operation}`;
}
