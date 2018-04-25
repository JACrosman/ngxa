import { Injectable } from '@angular/core';
import { ApiEntityState, ApiState, ApiRequest, ApiService } from '@ngxa/ngrx';
import { EntityAdapter } from '@ngrx/entity';

export interface Project {
    _id: string;
    name: string;
}

export interface ProjectState extends ApiEntityState<Project> {
    isPublishing?: boolean;
}

@ApiState<ProjectState>({
    name: 'project',
    route: 'http://localhost:3000/api/project',
    defaults: {
        isPublishing: false
    },
    idSelector: (project: any) => project._id
})
export class ProjectApiState {
    @ApiRequest({ name: 'project', path: '/publish/:name', method: 'PUT' })
    publish() {
        return {
            start: (state: ProjectState) => {
                return { ...state, isPublishing: true };
            },
            success: (state: ProjectState, result: any, adapter: EntityAdapter<Project>) => {
                return { ...adapter.updateOne({ id: result.payload._id, changes: result.payload }, state), isPublished: true, isPublishing: false };
            },
            failure: (state: ProjectState, result: any) => {
                return { ...state, isPublished: false, isPublishing: false };
            }
        };
    }
}

@Injectable()
export class ProjectApiService extends ApiService<Project> {
    constructor(projectState: ProjectApiState) {
        super(projectState);
    }

    publish(name: string, project: Project) {
        this.dispatch('publish', { name }, project);
    }
}
