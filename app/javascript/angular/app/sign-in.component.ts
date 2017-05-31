import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'sign-in',
  template:`
    <form class="form" (ngSubmit)="onSubmit()" action="/users/sign_in" method="post">
      <md-input-container>
        <input mdInput type="email" name="user[email]" placeholder="mail address" required>
      </md-input-container>

      <md-input-container class="full-width">
        <input mdInput type="password" name="user[password]" placeholder="password" required>
      </md-input-container>
      <button type="submit" md-raised-button>Submit</button>
    </form>
  `,
  styles: [``]
})

export class SigninComponent {
  onSubmit(): void {
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }
}
