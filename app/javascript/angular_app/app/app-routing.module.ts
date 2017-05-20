import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PageNotFoundComponent } from './not-found.component';
import { SignupComponent } from './sign-up.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'teachers/sign_up', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
