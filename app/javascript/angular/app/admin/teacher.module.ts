import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { TeacherComponent }          from './teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard.component';

import { TeacherRoutingModule } from './teacher-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TeacherRoutingModule
  ],
  declarations: [
    TeacherComponent,
    TeacherDashboardComponent
  ]
})

export class TeacherModule { }
