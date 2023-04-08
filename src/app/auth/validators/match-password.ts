import { FormGroup, Validator } from '@angular/forms';

export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      // what ever obj will be returned
      // is going be assign to the errors property of FormGroup
      // for instance: authForm.errors ===  { passwordsDontMatch: true };
      return { passwordDontMatch: true };
    }
  }
}
