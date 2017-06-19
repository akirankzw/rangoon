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
import { EditBookDialogComponent } from './edit-book-dialog.component';

import { LessonService }           from './lesson.service';
import { BookService }             from './book.service';
import { UserService }             from './user.service';

import { UserModule }    from './user/user.module';
import { TeacherModule } from './admin/teacher.module';

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
    EditBookDialogComponent
  ],
  providers: [
    LessonService,
    BookService,
    UserService
  ],
  entryComponents: [
    BookDialogComponent,
    EditBookDialogComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
