import { Component } from '@angular/core';
import { User } from './user';
import templateString from './sign-in.component.html';

@Component({
  selector: 'sign-in',
  template: templateString,
  styles: [``]
})

export class SigninComponent {
  onSubmit(): void {
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }
}
