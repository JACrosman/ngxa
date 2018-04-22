import { NgModule, ModuleWithProviders } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { NgrxSelect } from './select';

/**
 * Root module
 * @ignore
 */
@NgModule()
export class NgxaRootModule {
  constructor() {
  }
}

/**
 * Ngxa Module
 */
@NgModule({})
export class NgxaModule {
  /**
   * Root module factory
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxaRootModule,
      providers: [
        NgrxSelect
      ]
    };
  }

  constructor(
    store: Store<any>,
    httpClient: HttpClient,
    select: NgrxSelect
  ) {
    select.connect(store, httpClient);
  }
}
