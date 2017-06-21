import { Component } from '@angular/core';
import { User } from '../user';

import templateString from './user-signup.component.html';

@Component({
  template: templateString
})

export class UserSignupComponent {
  submitted = false;

  model: User = new User();

  onSubmit() {
    this.submitted = true;
    // authenticity_token
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }

  get diagnostic() { return JSON.stringify(this.model); };
}
