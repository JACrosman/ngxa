import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxaModule } from '@ngxa/ngrx';

import { AppStateModule } from './state/app.state.module';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    NgxaModule,
    AppStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
