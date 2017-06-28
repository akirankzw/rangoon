import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherComponent }          from './teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard.component';

const adminRoutes: Routes = [
  {
    path: 'admin/teachers',
    component: TeacherComponent,
    children: [
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
