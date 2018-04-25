import { Injectable } from '@angular/core';
import { ApiEntityState, ApiState, ApiService } from '@ngxa/ngrx';

export interface Course {
    id: string;
    name: string;
}

export interface CourseState extends ApiEntityState<Course> {
}

@ApiState<CourseState>({
    name: 'course',
    route: 'http://localhost:3000/api/project/:project/course',
    subRoutes: ['project']
})
export class CourseApiState {
}

@Injectable()
export class CourseApiService extends ApiService<Course> {
    constructor(courseState: CourseApiState) {
        super(courseState);
    }
}
