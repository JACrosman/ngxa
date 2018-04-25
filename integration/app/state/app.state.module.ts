
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgxaModule } from '@ngxa/ngrx';
import { ProjectApiState, ProjectApiService } from './project.state';
import { CourseApiState, CourseApiService } from './course.state';


@NgModule({
    imports: [
        StoreModule.forRoot({
        }),
        StoreDevtoolsModule.instrument({
            name: 'NGXA',
            maxAge: 25
        }),
        NgxaModule.forRoot({
        }),
        NgxaModule.forFeature('project', {
            project: ProjectApiState,
        })
    ],
    providers: [
        ProjectApiState,
        CourseApiState,
        ProjectApiService,
        CourseApiService
    ]
})
export class AppStateModule { }
