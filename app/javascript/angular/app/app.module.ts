import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule }              from '@angular/http';
import { FormsModule }             from '@angular/forms';
import { MaterialModule }          from '@angular/material';
import { MdNativeDateModule }      from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }            from './app.component';
import { DashboardComponent }      from './dashboard.component';
import { PageNotFoundComponent }   from './not-found.component';
import { SignupComponent }         from './sign-up.component';
import { TeachersComponent }       from './teachers.component';
import { UsersComponent }          from './users.component';

import { LessonService }           from './lesson.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MdNativeDateModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    SignupComponent,
    TeachersComponent,
    UsersComponent
  ],
  providers: [
    LessonService
  ]
  ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}
