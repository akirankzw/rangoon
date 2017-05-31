import { Component } from '@angular/core';

@Component({
  selector: 'angular',
  template: `
<md-toolbar color="accent">
  <md-toolbar-row>
    <span class="spacer"></span>
    <a href="/users/sign_in"><md-icon class="icon">face</md-icon></a>
    <a href="/users/sign_out"><md-icon class="icon">exit_to_app</md-icon></a>
    <a routerLink="/dashboard"><md-icon class="icon">dashboard</md-icon></a>
    <a *ngIf="user && user.id" [routerLink]="['/users', user.id]"><md-icon class="icon">home</md-icon></a>
    <md-icon class="icon">build</md-icon>
    <md-icon class="icon">note_add</md-icon>
    <md-icon class="icon">favorite</md-icon>
    <a routerLink="/teachers/1" routerLinkActive="active"><md-icon class="icon">assignment</md-icon></a>
  </md-toolbar-row>
</md-toolbar>

<router-outlet></router-outlet>`
})

export class AppComponent {}
