import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, createSelector } from '@ngrx/store';

import { NgrxSelect } from './select';
import { IdSelector, defaultSelectId } from './utils';
import { ApiEntityState } from './symbols';

export interface ParamMap {
    [key: string]: IdType;
}

export type IdType = string | number;

export class ApiService<T> {
    /** Returns the primary key (id) of this entity */
    selectId: IdSelector<T>;

    entities$: Observable<T[]>;

    entity$: Observable<T>;

    loading$: Observable<boolean>;

    isLoaded$: Observable<boolean>;

    constructor(
        private name: string
    ) {
        this.selectId = defaultSelectId;

        this.createSelectors();
    }

    protected dispatch(request: string, params?: ParamMap, data?: any)  {
        NgrxSelect.store.dispatch({ type: `[${this.name}] ${request} start`, payload: { params, data } });
    }

    public query() {
        this.dispatch('query');
    }

    public get(key: IdType | T) {
        this.dispatch('get', { id: this.getKey(key) });
    }

    public create(entity: T): void {
        this.dispatch('create', null, entity);
    }

    public update(entity: Partial<T>): void {
        this.dispatch('update', { id: this.getKey(entity) });
    }

    public delete(key: IdType | T): void {
        this.dispatch('delete', { id: this.getKey(key) });
    }

    /** Get key from entity (unless arg is already a key) */
    private getKey(arg: any) {
        return typeof arg === 'object' ? this.selectId(arg) : arg;
    }

    private createSelectors() {
        const selectState = state => state[this.name];
        const selectKeys = (c: ApiEntityState<T>) => c.ids;
        const selectApiMap = (c: ApiEntityState<T>) => c.entities;
        const selectSelectedEntityId = (c: ApiEntityState<T>) => c.entityId;

        const selectEntities = createSelector(
            selectKeys,
            selectApiMap,
            (keys: any[], entities): any => keys.map(key => entities[key] as T)
        );

        const selectEntity = createSelector(
            selectEntities,
            selectSelectedEntityId,
            (entities, id) => id && entities.filter(entity => entity._id === id)[0]
        );

        const selectStateEntities = createSelector(
            selectState,
            selectEntities
        );

        const selectStateEntity = createSelector(
            selectState,
            selectEntity
        );

        // const selectCount = createSelector(selectKeys, keys => keys.length);
        // const selectLoaded = (c: ApiEntityState<T>) => c.loaded;
        // const selectLoading = (c: ApiEntityState<T>) => c.loading;

        this.entities$ = NgrxSelect.store.select(selectStateEntities);
        this.entity$ = NgrxSelect.store.select(selectStateEntity);
    }
}

/**
 * Creates ApiService instances for
 * a cached collection of T entities in the ngrx store.
 */
@Injectable()
export class ApiServiceFactory {
    get store() {
        return this._store;
    }

    constructor(
        private _store: Store<any>
    ) { }
}
