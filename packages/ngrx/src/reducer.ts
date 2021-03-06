import { Action } from '@ngrx/store';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { NGRA_STATE_META, StateMetdata, generateUrl, createRequestAction, generateParams } from './internals';
import { NgrxSelect, getState } from './select';

const methodMap = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'remove'
};

export function createReducer<TState = any>(
  store:
    | {
        new (...args: any[]): any;
      }
    | any
): (state: TState, action: Action | any) => TState {
  const isInstance = !store.prototype;
  const klass = isInstance ? store.constructor : store;

  if (!klass.hasOwnProperty(NGRA_STATE_META)) {
    throw new Error('A reducer can be created from a @ApiState decorated class only.');
  }

  const instance = isInstance ? store : new store();
  const { requests, actions, adapter, defaults, name, route, subRoutes } = klass[NGRA_STATE_META] as StateMetdata;
  const initialState = adapter.getInitialState({ ...defaults, isLoading: false, isLoaded: false, error: null });

  return function(state: any = initialState, action: any) {
    const requestMeta = requests[action.type];
    let result;

    if (requestMeta) {
        // Handle the request reducer
        result = requestMeta.handler(state, action, adapter);

        // Make the request if necessary
        if (requestMeta.info) {
          const requestHandler = requestMeta.request ||
            requests[createRequestAction(name, methodMap[requestMeta.info.method.toLowerCase()], 'start')].request;
          const params = subRoutes ? generateParams(getState(), subRoutes) : {};
          const path = generateUrl(requestMeta.info, route, { ...action.payload.params, ...params });
          const info = requestMeta.info;
          const data = action.payload.data;

          requestHandler({ info, path, data }).pipe(
            map((response: any) => {
              return <any>{ type: `[${name}] ${requestMeta.name} success`, payload: response };
            }),
            catchError((response: any) => {
              return of (<any>{ type: `[${name}] ${requestMeta.name} failure`, payload: response });
            })
          ).subscribe(NgrxSelect.store);
        }
    } else {
      const actionMeta = actions[action.type];

      if (actionMeta) {
        result = instance[actionMeta.fn](state, action);
      }
    }

    if (result === undefined) {
        if (Array.isArray(state)) {
          return [...state];
        } else {
          return { ...state };
        }
    }

    return result;
  };
}
