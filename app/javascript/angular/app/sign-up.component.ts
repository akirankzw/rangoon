import { Component } from '@angular/core';
import { Teacher } from './teacher';

@Component({
  selector: 'signup',
  template: `
<form class="form" (ngSubmit)="onSubmit()" action="/teachers" method="post" #teacherForm="ngForm">
  <md-input-container class="full-width">
    <input mdInput type="email" [(ngModel)]="model.email" name="teacher[email]" placeholder="メールアドレス" required #email="ngModel">
  </md-input-container>
  <div [hidden]="email.valid || email.pristine" class="alert alert-danger">email is required</div>

  <table class="full-width" cellspacing="0">
    <tr>
      <td>
        <md-input-container class="full-width">
          <input mdInput type="password" [(ngModel)]="model.password" name="teacher[password]" placeholder="パスワード" required #password="ngModel">
        </md-input-container>
        <div [hidden]="password.valid || password.pristine" class="alert alert-danger">password is required</div>
      </td>
      <td>
        <md-input-container class="full-width">
          <input mdInput type="password" [(ngModel)]="model.password_confirmation" name="teacher[password_confirmation]" placeholder="パスワード確認" required #password_confirmation="ngModel">
        </md-input-container>
        <div [hidden]="password_confirmation.valid || password_confirmation.pristine" class="alert alert-danger">password is required</div>
      </td>
    </tr>
  </table>
  <button type="submit" md-raised-button [disabled]="!teacherForm.form.valid">Submit</button>
  <button type="button" md-raised-button (click)="newTeacher(); teacherForm.reset()">Reset</button>
</form>{{diagnostic}}`
})

export class SignupComponent {
  submitted = false;

  model = new Teacher(1, 'test@example.com', 'Taro', 'Suzuki', '', '');

  onSubmit() {
    this.submitted = true;
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  };

  newTeacher() {
    this.model = new Teacher(1, '', '', '', '', '');
  }

  get diagnostic() { return JSON.stringify(this.model); };
}
