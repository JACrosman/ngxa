import { Action } from '@ngrx/store';
import { NGRA_STATE_META, StateMetdata } from './internals';
import { NgrxSelect } from './select';
import { take, materialize } from 'rxjs/operators';

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
  const { defaults, requests, name, route } = klass[NGRA_STATE_META] as StateMetdata;

  return function(state: any = defaults, action: Action) {
    const actionMeta = requests[action.type].action;
    if (actionMeta) {
    }

    return state;
  };
}