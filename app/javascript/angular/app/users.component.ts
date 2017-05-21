import { Component } from '@angular/core';

@Component({
  selector: 'users',
  template: `
    <md-toolbar color="primary">
    <md-toolbar-row>
    <span class="spacer"></span>
    <md-icon class="icon">favorite</md-icon>
    <md-icon class="icon">exit_to_app</md-icon>
    <md-icon class="icon">dashboard</md-icon>
    <md-icon class="icon">home</md-icon>
    <md-icon class="icon">build</md-icon>
    <md-icon class="icon">note_add</md-icon>
    <a routerLink="/teachers/1"><md-icon class="icon">assignment</md-icon></a>
    </md-toolbar-row>
    </md-toolbar>
    <router-outlet></router-outlet>`
})

export class UsersComponent {}
