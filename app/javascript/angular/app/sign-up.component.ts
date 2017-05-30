import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'sign-up',
  template:`
<form class="form" (ngSubmit)="onSubmit()" action="/users" method="post" #userForm="ngForm">
  <md-input-container>
    <input mdInput type="email" [(ngModel)]="model.email" name="user[email]" placeholder="mail address" required #email="ngModel">
  </md-input-container>
  <div [hidden]="email.valid || email.pristine" class="alert alert-danger">email is required</div>
  <table class="full-width" cellspacing="0">
    <tr>
      <td>
        <md-input-container class="full-width">
          <input mdInput type="password" [(ngModel)]="model.password" name="user[password]" placeholder="password" required #password="ngModel">
        </md-input-container>
        <div [hidden]="password.valid || password.pristine" class="alert alert-danger">password is required</div>
      </td>
      <td>
        <md-input-container class="full-width">
          <input mdInput type="password" [(ngModel)]="model.password_confirmation" name="user[password_confirmation]" placeholder="password" required #password_confirmation="ngModel">
        </md-input-container>
        <div [hidden]="password_confirmation.valid || password_confirmation.pristine" class="alert alert-danger">password is required</div>
      </td>
      <td>
        <md-select placeholder="sex" [(ngModel)]="selectedValue" name="user[sex]">
          <md-option *ngFor="let sex of gender" [value]="sex.value">
            {{sex.viewValue}}
          </md-option>
        </md-select>
      </td>
      <td>
        <md-input-container>
          <input mdInput [mdDatepicker]="picker" placeholder="Choose a date">
          <button mdSuffix [mdDatepickerToggle]="picker"></button>
        </md-input-container>
        <md-datepicker #picker></md-datepicker>
      </td>
    </tr>
  </table>
  <button type="submit" md-raised-button [disabled]="!userForm.form.valid">Submit</button>
  <button type="button" md-raised-button (click)="newUser(); userForm.reset()">Reset</button>
</form>`
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
