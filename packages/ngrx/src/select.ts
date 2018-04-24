import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable()
export class NgrxSelect {
  static store: Store<any> | undefined = undefined;
  static httpClient: HttpClient | undefined = undefined;
  connect(store: Store<any>, httpClient: HttpClient) {
    NgrxSelect.store = store;
    NgrxSelect.httpClient = httpClient;
  }
}

export function getState(): any {
  let state;

  NgrxSelect.store.pipe(
    take(1)
  ).subscribe(s => state = s);

  return state;
}
