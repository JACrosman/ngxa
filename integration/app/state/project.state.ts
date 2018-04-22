import { Injectable } from '@angular/core';
import { ApiEntityState, ApiState, ApiRequest, ApiService } from '@ngxa/ngrx';

export interface Project {
    id: string;
    name: string;
}

export interface ProjectState extends ApiEntityState<Project> {
    isPublishing?: boolean;
}

@ApiState<ProjectState>({
    name: 'project',
    route: '/project',
    defaults: {
        isPublishing: false
    }
})
export class ProjectApiState {
    @ApiRequest({ path: '/publish/:name', method: 'PUT' })
    publish() {
        return {
            start: (state: ProjectState) => {
                return { ...state, isLoading: true };
            },
            success: (state: ProjectState, result: any) => {
                return { ...state, isPublished: true, isPublishing: false };
            },
            failure: (state: ProjectState, result: any) => {
                return { ...state, isPublished: false, isPublishing: false };
            }
        };
    }
}

@Injectable()
export class ProjectApiService extends ApiService<Project> {
    constructor() {
        super('project');
    }

    publish(name: string, project: Project) {
        this.dispatch('publish', { name }, project);
    }
}
