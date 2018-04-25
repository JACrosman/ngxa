import { NgModule, ModuleWithProviders, InjectionToken, Inject, Optional, Injector } from '@angular/core';
import { Store, ReducerManager, StoreModule } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { NgrxSelect } from './select';
import { createReducer } from './reducer';

export const STATE_TOKEN = new InjectionToken<any>('STATE_TOKEN');
export const FEATURE_STATE_TOKEN = new InjectionToken<any>('FEATURE_STATE_TOKEN');

/**
 * Ngxa Module
 */
@NgModule({
  imports: [StoreModule],
  providers: [NgrxSelect]
})
export class NgxaModule {
  /**
   * Root module factory
   */
  static forRoot(reducers: any): ModuleWithProviders {
    return {
      ngModule: NgxaModule,
      providers: [
        {
          provide: STATE_TOKEN,
          useValue: reducers
        }
      ]
    };
  }

  /**
   * Feature module factory
   */
  static forFeature(key: any, reducers?: any): ModuleWithProviders {
    return {
      ngModule: NgxaModule,
      providers: [
        {
          provide: FEATURE_STATE_TOKEN,
          useValue: { key, reducers }
        }
      ]
    };
  }

  constructor(
    @Optional()
    @Inject(STATE_TOKEN)
    reducers: any,
    @Optional()
    @Inject(FEATURE_STATE_TOKEN)
    featureReducers: any,
    reducerFactory: ReducerManager,
    store: Store<any>,
    parentInjector: Injector,
    select: NgrxSelect,
    httpClient: HttpClient,
  ) {
    select.connect(store, httpClient);

    if (reducers) {
      for (const key in reducers) {
        const klass = reducers[key];
        const inst = parentInjector.get(klass, new klass());
        reducerFactory.addReducer(key, createReducer(inst));
      }
    }

    if (featureReducers) {
      for (const key in featureReducers.reducers) {
        const klass = featureReducers.reducers[key];
        const inst = parentInjector.get(klass, new klass());
        reducerFactory.addReducer(key, createReducer(inst));
      }
    }
  }
}
