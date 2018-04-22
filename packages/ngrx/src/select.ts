import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';


@Injectable()
export class NgrxSelect {
  static store: Store<any> | undefined = undefined;
  static httpClient: HttpClient | undefined = undefined;
  connect(store: Store<any>, httpClient: HttpClient) {
    NgrxSelect.store = store;
    NgrxSelect.httpClient = httpClient;
  }
}
