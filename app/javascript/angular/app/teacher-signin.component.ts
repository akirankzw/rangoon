import { Component }   from '@angular/core';

import templateString from './teacher-signin.component.html';

@Component({
  selector: 'teacher-signin',
  template: templateString,
  styles: [``]
})

export class TeacherSigninComponent {
  onSubmit(): void {
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }
}
