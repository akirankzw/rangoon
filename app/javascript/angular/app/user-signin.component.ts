import { Component } from '@angular/core';

import templateString from './user-signin.component.html';

@Component({
  template: templateString
})

export class UserSigninComponent {
  onSubmit(): void {
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }
}
