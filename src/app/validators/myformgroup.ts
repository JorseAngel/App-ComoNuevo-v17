import { MyFormControl } from './myFormControl';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class MyFormGroup {
  private _formGroup: FormGroup;

  constructor(
    private nameControl: string[],
    private formControls: MyFormControl[]
  ) {
    this._formGroup = new FormGroup({});
    for (let index = 0; index < nameControl.length; index++) {
      this.formGroup.addControl(nameControl[index], formControls[index]);
    }
  }

  public insertarValidationMessages(
    nameControl: string,
    errors: string[],
    messages: string[]
  ) {
    let control = this.getControl(nameControl);
    for (let index = 0; index < errors.length; index++) {
      control.insertValidationMessage(errors[index], messages[index]);
    }
  }

  insertarControl(key: string, value: FormControl) {
    this.formGroup.addControl(key, value);
  }

  public getControl(key: string): MyFormControl {
    let retorno=this.formGroup.get(key);
    return <MyFormControl> retorno;
  }

  public get formGroup(): FormGroup {
    return this._formGroup;
  }
}
