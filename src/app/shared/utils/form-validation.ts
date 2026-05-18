import { FormGroup } from '@angular/forms';

/** True when a control is invalid and the user has tried to submit or left the field. */
export function controlShowsError(
  form: FormGroup,
  controlName: string,
  formSubmitted: boolean,
): boolean {
  const control = form.get(controlName);
  if (!control) {
    return false;
  }
  return control.invalid && (control.touched || formSubmitted);
}
