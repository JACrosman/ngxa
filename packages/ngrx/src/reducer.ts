import { Action } from '@ngrx/store';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { NGRA_STATE_META, StateMetdata, generateUrl } from './internals';
import { NgrxSelect } from './select';

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

  const { adapter, defaults, requests, name, route } = klass[NGRA_STATE_META] as StateMetdata;
  const initialState = adapter.getInitialState({ ...defaults, isLoading: false, isLoaded: false, error: null });

  return function(state: any = initialState, action: any) {
    const requestMeta = requests[action.type];
    let result;
    // Handle the request reducer
    if (requestMeta) {
        result = requestMeta.handler(state, action, adapter);

        // Make the request if necessary
        if (requestMeta.handler) {
          const requestHandler = requestMeta.request || klass[requestMeta.info.method.toLowerCase()].request.fn;
          const path = generateUrl(name, requestMeta.info, route);
          const info = requestMeta.info;
          const data = action.payload;

          requestHandler({ info, path, data }).pipe(
            map((response: any) => {
              return <any>{ type: `[${name}] ${requestMeta.name} success`, payload: response };
            }),
            catchError((response: any) => {
              return of (<any>{ type: `[${name}] ${requestMeta.name} failure`, payload: response });
            })
          ).subscribe(NgrxSelect.store);
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