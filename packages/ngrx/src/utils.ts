export type ComparerStr<T> = (a: T, b: T) => string;
export type ComparerNum<T> = (a: T, b: T) => number;
export type Comparer<T> = ComparerNum<T> | ComparerStr<T>;
export type IdSelectorStr<T> = (model: Partial<T>) => string;
export type IdSelectorNum<T> = (model: Partial<T>) => number;
export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;
export interface DictionaryNum<T> {
  [id: number]: T;
}
export abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T;
}

export interface UpdateStr<T> {
  id: string;
  changes: Partial<T>;
}

export interface UpdateNum<T> {
  id: number;
  changes: Partial<T>;
}

export type Update<T> = UpdateStr<T> | UpdateNum<T>;

export function defaultSelectId(entity: any) {
    return entity == null ? undefined : entity.id;
}

export function toUpdateFactory<T>(selectId?: IdSelector<T>) {
  selectId = selectId || defaultSelectId as IdSelector<T>;

  return function toUpdate(entity: Partial<T>): Update<T> {
    const id: any = selectId(entity);
    if (id == null) { throw new Error('Primary key may not be null/undefined.'); }
    return entity && { id, changes: entity } ;
  };
}
