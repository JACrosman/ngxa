import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { NgrxSelect } from './select';
import { ApiRequestInfo } from './symbols';

export class RestApiService {
    static execute(info: ApiRequestInfo, route: string, payload: any): Observable<any> {
        const req = { info, route, payload };
        const url = `${route}/${info.path}`;

        const tail = pipe(
            catchError((err: any) => {
                return new ErrorObservable(req);
            })
        );

        switch (info.method) {
            case 'GET': {
                return NgrxSelect.httpClient.get(url, info.options).pipe(tail);
            }
            case 'POST': {
                return NgrxSelect.httpClient.post(url, payload, info.options).pipe(tail);
            }
            case 'PUT': {
                return NgrxSelect.httpClient.put(url, payload, info.options).pipe(tail);
            }
            case 'DELETE': {
                return NgrxSelect.httpClient.delete(url, info.options).pipe(tail);
            }
            default: {
              const error = new Error('Unimplemented HTTP method, ' + info.method);
              return new ErrorObservable(error);
            }
        }
    }
}
