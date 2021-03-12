import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
export class MyFormControl extends FormControl {

  validationMessages = new Map<string, string>();
  
  constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null){
    super(formState,validatorOrOpts,asyncValidator)    
  };

  public insertValidationMessage(error: string, message: string) {
    this.validationMessages.set(error, message);
  }

  public getValidationMessage(error: string): string {
    return this.validationMessages.get(error);
  }
  
}
