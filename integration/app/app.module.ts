import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxaModule } from '@ngxa/ngrx';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
