import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { UserComponent }          from './user.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserEditComponent }      from './user-edit.component';
import { UserNoteComponent }      from './user-note.component';

import { UserRoutingModule } from './user-routing.module';

import { TruncatePipe } from '../truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserDashboardComponent,
    UserEditComponent,
    UserNoteComponent,
    TruncatePipe
  ]
})

export class UserModule { }
