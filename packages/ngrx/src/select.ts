import { Injectable } from '@angular/core';
import { Store, Selector } from '@ngrx/store';


@Injectable()
export class NgrxSelect {
  static store: Store<any> | undefined = undefined;
  connect(store: Store<any>) {
    NgrxSelect.store = store;
  }
}
