import { Action } from '@ngrx/store';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { NGRA_STATE_META, StateMetdata } from './internals';
import { RestApiService } from './rest';
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

  const instance = isInstance ? store : new store();
  const { adapter, defaults, requests, name, route } = klass[NGRA_STATE_META] as StateMetdata;
  const initialState = adapter.getInitialState({ ...defaults });

  return function(state: any = initialState, action: any) {
    const requestMeta = requests[action.type];
    let result;

    // Handle the request reducer
    if (requestMeta) {
        result = requestMeta.handler(state, action);

        // Make the request if necessary
        if (requestMeta.request) {
          RestApiService.execute(requestMeta.request, route, action.payload).pipe(
            map((data: any) => {
              NgrxSelect.store.dispatch({ type: `[${instance.name}] ${name} success`, payload: data });
            }),
            catchError((data: any) => {
              NgrxSelect.store.dispatch({ type: `[${instance.name}] ${name} success`, payload: { error: data } });

              return of(data);
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

    return state;
  };
}