import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherComponent }          from './teacher.component';
import { TeacherEditComponent }      from './teacher-edit.component';
import { TeacherDashboardComponent } from './teacher-dashboard.component';
import { UsersComponent }            from './users.component';

const adminRoutes: Routes = [
  { path: 'admin',
    component: TeacherComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'teachers',
        children: [
          { path: 'dashboard', component: TeacherDashboardComponent },
          { path: 'profile', component: TeacherEditComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TeacherRoutingModule { }
