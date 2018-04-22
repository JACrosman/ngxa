
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { createReducer, NgxaModule } from '@ngxa/ngrx';
import { ProjectApiState, ProjectApiService } from './project.state';

export function projectReducer(state, action) { return createReducer(ProjectApiState)(state, action); }

@NgModule({
    imports: [
    NgxaModule.forRoot(),
       StoreModule.forRoot({
          project: projectReducer
       }),
       StoreDevtoolsModule.instrument({
        name: 'NGXA',
        maxAge: 25
      })
    ],
    providers: [
        ProjectApiService
    ]
 })
 export class AppStateModule { }