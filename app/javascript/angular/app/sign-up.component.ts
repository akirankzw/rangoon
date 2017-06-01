import { Component } from '@angular/core';
import { User } from './user';

import templateString from './sign.in.component.html';

@Component({
  selector: 'sign-up',
  template: templateString,
})

export class SignupComponent {
  submitted = false;
  selectedValue: string;

  gender = [
    { value: 'male-0', viewValue: 'male' },
    { value: 'female-1', viewValue: 'female' }
  ]

  model = new User(0, 'test@example.com', 'Taro', 'Suzuki', '', '', '', ''); // TODO

  onSubmit() {
    this.submitted = true;
    // authenticity_token
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }

  newUser() {
    this.model = new User(0, '', '', '', '', '', '', '');
  }

  get diagnostic() { return JSON.stringify(this.model); };
}
