import { NgModule, ModuleWithProviders } from '@angular/core';

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
      ]
    };
  }
}
