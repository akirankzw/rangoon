import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule }              from '@angular/http';
import { FormsModule }             from '@angular/forms';
import { MaterialModule }          from '@angular/material';
import { MdNativeDateModule }      from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }            from './app.component';
import { PageNotFoundComponent }   from './not-found.component';
import { SignupComponent }         from './sign-up.component';
import { SigninComponent }         from './sign-in.component';
import { TeachersComponent }       from './teachers.component';
import { UsersComponent }          from './users.component';
import { BookDialogComponent }     from './book-dialog.component';

import { LessonService }           from './lesson.service';
import { BookService }             from './book.service';
import { UserService }             from './user.service';

import { TeacherModule } from './admin/teacher.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    HttpModule,
    FormsModule,
    TeacherModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    TeachersComponent,
    UsersComponent,
    BookDialogComponent
  ],
  providers: [
    LessonService,
    BookService,
    UserService
  ],
  entryComponents: [
    BookDialogComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
