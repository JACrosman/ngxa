
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
            project: ProjectApiState
        }),
        NgxaModule.forFeature('course', {
            course: CourseApiState
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
