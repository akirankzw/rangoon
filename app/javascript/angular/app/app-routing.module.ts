import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }    from './dashboard.component';
import { PageNotFoundComponent } from './not-found.component';
import { SignupComponent }       from './sign-up.component';
import { UserSignupComponent }   from './user-sign-up.component';
import { TeachersComponent }     from './teachers.component';
import { UsersComponent }        from './users.component';

const routes: Routes = [
  { path: 'admin/teachers/dashboard', component: DashboardComponent },
  { path: 'admin/teachers/sign_up',   component: SignupComponent },
  { path: 'teachers/:id',             component: TeachersComponent },
  { path: 'users/sign_up',            component: UserSignupComponent },
  { path: 'users/:id',                component: UsersComponent },
  { path: '**',                       component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
