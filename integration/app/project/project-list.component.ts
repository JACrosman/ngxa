import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectApiService } from '../state/project.state';
import { CourseApiService } from '../state/course.state';

@Component({
    selector: 'app-project-list',
    template: `
    <div *ngIf="projects$ | async as projects">
        <ul *ngFor="let project of projects">
            <li (click)="select(project)">{{project.name}}</li>
        </ul>
    </div>
    <div *ngIf="project$ | async as project">
        <h3>Selected Project: {{ project.name }}</h3>
    </div>
    `
})

export class ProjectComponent implements OnInit {
    projects$: Observable<Project[]>;
    project$: Observable<Project>;

    constructor(
        private projectService: ProjectApiService,
        private courseService: CourseApiService
    ) {
        this.projects$ = this.projectService.entities$;
        this.project$ = this.projectService.entity$;

        this.projectService.query();

        this.projectService.publish('test',  { _id: '3', name: 'test' });
    }

    ngOnInit() { }

    select(project: Project) {
        this.projectService.get(project);

        this.project$.subscribe((proj) => {
            if (proj) {
                this.courseService.query();
            }
        });
    }
}
