import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectApiService } from '../state/project.state';

@Component({
    selector: 'app-project-list',
    template: `
    <div *ngIf="projects$ | async as projects">
        <ul *ngFor="let project of projects">
            <li>{{project.name}}</li>
        </ul>
    </div>
    `
})

export class ProjectComponent implements OnInit {
    projects$: Observable<Project[]>;

    constructor(private projectService: ProjectApiService) {
        this.projects$ = this.projectService.entities$;

        this.projectService.query();

        this.projectService.publish('test',  { id: '3', name: 'test' });
    }

    ngOnInit() { }
}
