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
import { TeachersComponent }       from './teachers.component';
import { BookDialogComponent }     from './book-dialog.component';
import { NoteDialogComponent }     from './note-dialog.component';
import { EditBookDialogComponent } from './edit-book-dialog.component';
import { UserSigninComponent }     from './user-signin.component';
import { UserSignupComponent }     from './user-signup.component';
import { TeacherSigninComponent } from './teacher-signin.component';

import { LessonService }           from './lesson.service';
import { BookService }             from './book.service';
import { UserService }             from './user.service';
import { NoteService }             from './note.service';
import { TeacherService }          from './teacher.service';

import { UserModule }    from './user/user.module';
import { TeacherModule } from './admin/teacher.module';

import { APP_CONFIG, DI_CONFIG } from './app.config';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    HttpModule,
    FormsModule,
    UserModule,
    TeacherModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TeachersComponent,
    BookDialogComponent,
    NoteDialogComponent,
    EditBookDialogComponent,
    UserSigninComponent,
    UserSignupComponent,
    TeacherSigninComponent
  ],
  providers: [
    LessonService,
    BookService,
    UserService,
    NoteService,
    TeacherService,
    { provide: APP_CONFIG, useValue: DI_CONFIG }
  ],
  entryComponents: [
    BookDialogComponent,
    NoteDialogComponent,
    EditBookDialogComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
