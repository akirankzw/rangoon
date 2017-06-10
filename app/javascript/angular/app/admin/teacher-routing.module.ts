import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherComponent }          from './teacher.component';
import { TeacherSigninComponent }    from './teacher-signin.component';
import { TeacherDashboardComponent } from './teacher-dashboard.component';

const adminRoutes: Routes = [
  {
    path: 'admin/teachers',
    component: TeacherComponent,
    children: [
      {
        path: 'sign_in',
        children: [
          { path: '', component: TeacherSigninComponent }
        ]
      },
      {
        path: 'dashboard',
        children: [
          { path: '', component: TeacherDashboardComponent }
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

export class TeacherRoutingModule {}
