import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { TeachersComponent }     from './teachers.component';

import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'teachers',
    component: UserComponent,
    children: [
      { path: ':id', component: TeachersComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
