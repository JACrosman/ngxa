import { Observable } from 'rxjs/Observable';
import { ApiResponse } from './response';
import { ApiRequest } from './request';

export interface ParamMap {
    [key: string]: string;
}

export type IdType = string | number;

export class ApiService<T> {
    entities$: Observable<T[]>;

    entity$: Observable<T>;

    loading$: Observable<boolean>;

    isLoaded$: Observable<boolean>;

    constructor(private name: string) {

    }

    protected request(params: ParamMap, data: any)  {

    }

    public query() {

    }

    public get(key: IdType | T) {

    }

    public create(entity: T): void {

    }

    public update(entity: Partial<T>): void {

    }

    public delete(key: IdType | T): void {

    }
}
