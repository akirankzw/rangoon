import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent }          from './user.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserEditComponent }      from './user-edit.component';
import { UserNoteComponent }      from './user-note.component';

const userRoutes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'dashboard', component: UserDashboardComponent },
          { path: 'profile',   component: UserEditComponent },
          { path: 'notes/:id', component: UserNoteComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {}
