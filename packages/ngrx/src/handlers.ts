import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EntityAdapter } from "@ngrx/entity";

import { ApiRequestHandler } from './symbols';
import { NgrxSelect } from './select';

function responseHandler(req: ApiRequestHandler) {
   return pipe(
        catchError((err: any) => {
            return new ErrorObservable(req);
        })
    );
}

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
        path: ':/id',
        method: 'GET',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const create = {
    request: {
        path: '',
        method: 'CREATE',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const put = {
    request: {
        path: ':/id',
        method: 'PUT',
    },
    handler: function() {
        return {
            request: (info: ApiRequestHandler): Observable<any> => {
                const res = responseHandler(info);
                return NgrxSelect.httpClient.put(info.path, info.data).pipe(res);
            },
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};

export const remove = {
    request: {
        path: ':/id',
        method: 'DELETE',
    },
    handler: function() {
        return {
            start: () => { },
            success: () => { },
            failure: () => { }
        };
    }
};
