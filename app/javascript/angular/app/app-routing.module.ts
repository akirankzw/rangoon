import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { SignupComponent }       from './sign-up.component';
import { SigninComponent }       from './sign-in.component';
import { TeachersComponent }     from './teachers.component';
import { UsersComponent }        from './users.component';

const routes: Routes = [
  { path: 'teachers/:id',             component: TeachersComponent },
  { path: 'users/sign_up',            component: SignupComponent },
  { path: 'users/sign_in',            component: SigninComponent },
  { path: 'users/:id',                component: UsersComponent },
  { path: '**',                       component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
