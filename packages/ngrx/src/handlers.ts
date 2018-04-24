import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EntityAdapter } from '@ngrx/entity';

import { ApiRequestHandler } from './symbols';
import { NgrxSelect } from './select';
import { toUpdateFactory, defaultSelectId } from './utils';

function responseHandler(req: ApiRequestHandler) {
   return pipe(
        catchError((err: any) => {
            return new ErrorObservable(req);
        })
    );
}

const toUpdate = toUpdateFactory(defaultSelectId);

export const query = {
    request: {
        path: '',
        method: 'GET',
    },
    handler: function() {
        return {
            request: (info: ApiRequestHandler): Observable<any> => {
                const res = responseHandler(info);
                return NgrxSelect.httpClient.get(info.path).pipe(res);
            },
            start: (state, action) => {
                return { ...state, isLoading: true };
             },
            success: (state, action, adapter: EntityAdapter<any>) => {
                return {
                    ...adapter.addAll(action.payload, state),
                    isLoading: false,
                    isLoaded: true
                };
            },
            failure: (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isLoaded: false,
                    error: action.payload
                };
            }
        };
    }
};

export const get = {
    request: {
        path: '/:id',
        method: 'GET',
    },
    handler: function() {
        return {
            request: (info: ApiRequestHandler): Observable<any> => {
                const res = responseHandler(info);
                return NgrxSelect.httpClient.get(info.path).pipe(res);
            },
            start: (state, action) => {
                return { ...state, isLoading: true };
            },
            success: (state, action, adapter: EntityAdapter<any>) => {
                const upsert = action.payload && toUpdate(action.payload);
                return upsert == null ?
                state.loading ? { ...state, loading: false } : state :
                {
                    ...adapter.upsertOne(upsert, state),
                    loading: false,
                    entityId: defaultSelectId(action.payload)
                };
            },
            failure: (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isLoaded: false,
                    error: action.payload
                };
            }
        };
    }
};

export const post = {
    request: {
        path: '',
        method: 'POST',
    },
    handler: function() {
        return {
            request: (info: ApiRequestHandler): Observable<any> => {
                const res = responseHandler(info);
                return NgrxSelect.httpClient.post(info.path, info.data).pipe(res);
            },
            start: (state, action) => {
                return state;
            },
            success: (state, action, adapter: EntityAdapter<any>) => {
                return adapter.addOne(action.payload, state);
            },
            failure: (state, action) => {
                return {
                    ...state,
                    error: action.payload
                };
            }
        };
    }
};

export const put = {
    request: {
        path: '/:id',
        method: 'PUT',
    },
    handler: function() {
        return {
            request: (info: ApiRequestHandler): Observable<any> => {
                const res = responseHandler(info);
                return NgrxSelect.httpClient.put(info.path, info.data).pipe(res);
            },
            start: (state, action) => {
                return state;
            },
            success: (state, action, adapter: EntityAdapter<any>) => {
                return adapter.upsertOne(action.payload, state);
            },
            failure: (state, action) => {
                return {
                    ...state,
                    error: action.payload
                };
            }
        };
    }
};

export const remove = {
    request: {
        path: '/:id',
        method: 'DELETE',
    },
    handler: function() {
        return {
            request: (info: ApiRequestHandler): Observable<any> => {
                const res = responseHandler(info);
                return NgrxSelect.httpClient.delete(info.path).pipe(res);
            },
            start: (state, action) => {
                return state;
            },
            success: (state, action, adapter: EntityAdapter<any>) => {
                return {
                    ...adapter.removeOne(action.payload, state),
                    entityId: null
                };
            },
            failure: (state, action) => {
                return {
                    ...state,
                    error: action.payload
                };
            }
        };
    }
};
