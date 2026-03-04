import { AbstractControl, ValidationErrors } from '@angular/forms';

export function corporateEmailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!control.value) {
    return null;
  }

  return emailRegex.test(control.value)
    ? null
    : { corporateEmail: true };
}
