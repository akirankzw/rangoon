import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';
import { TeachersComponent }     from './teachers.component';

const routes: Routes = [
  { path: 'teachers/:id',             component: TeachersComponent },
  { path: '**',                       component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
