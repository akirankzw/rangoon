import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }  from './not-found.component';
import { TeachersComponent }      from './teachers.component';
import { UserSigninComponent }    from './user-signin.component';
import { UserSignupComponent }    from './user-signup.component';
import { TeacherSigninComponent } from './teacher-signin.component';
import { UserComponent }          from './user/user.component';

const routes: Routes = [
  { path: 'users/sign_in',   component: UserSigninComponent },
  { path: 'users/sign_up',   component: UserSignupComponent },
  { path: 'admin/teachers/sign_in', component: TeacherSigninComponent },
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
