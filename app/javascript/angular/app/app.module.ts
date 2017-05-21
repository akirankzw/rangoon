import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';

import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent }   from './not-found.component';
import { SignupComponent } from './sign-up.component';
import { UserSignupComponent } from './user-sign-up.component';

import { LessonService } from './lesson.service';

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
    UserSignupComponent
  ],
  providers: [
    LessonService
  ]
  ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}
