import { Component } from '@angular/core';

import templateString from './user.component.html';

@Component({
  template: templateString,
  styles: [
    `
      .icon {
        margin: 0 4px 0 4px;
      }
    `
  ]
})

export class UserComponent {
  gotoSubscription(): void {
    location.href ="/subscriptions/new";
  }
}
