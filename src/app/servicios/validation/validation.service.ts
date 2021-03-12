import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyFormControl } from 'src/app/validators/myFormControl';
import { MyFormGroup } from 'src/app/validators/myformgroup';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private regexValues = {
    email: "^[(a-zA-Z-0-9-\\_\\+\\.)]+@[(a-z-A-z)]+\\.[(a-zA-z)]{2,3}$",
    password: "[0-9]{6}",
    letterWithSpace: "^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$",
    movil: "[6|7][0-9]{8}$",
    precio: "([0-9]{1,})|([0-9,]{1,}[0-9]{1,})|([0-9.]{1,}[0-9]{1,})"
  }

  getFormGroupEditPerfil(): any {
    return this.myEditPerfilFormGroup.formGroup
  }
  private myEditPerfilFormGroup: MyFormGroup;
  public nombreControlesEditPerfil = ['Email', 'Password', 'NewPassword','Nombre', 'Apellidos', 'Movil'];
  private controlesEditPerfil = [
    new MyFormControl('', Validators.pattern(this.regexValues.email)),
    new MyFormControl('', Validators.pattern(this.regexValues.password)),
    new MyFormControl('', Validators.pattern(this.regexValues.password)),
    new MyFormControl('', Validators.pattern(this.regexValues.letterWithSpace)),
    new MyFormControl('', Validators.pattern(this.regexValues.letterWithSpace)),
    new MyFormControl('', Validators.pattern(this.regexValues.movil)),
  ]

  getFormGroupAddPost(): any {
    return this.myAddPostFormGroup.formGroup
  }
  private myAddPostFormGroup: MyFormGroup;
  public nombreControlesAddPost = ['Titulo', 'Descripcion', 'Precio'];
  private controlesAddPost = [
    new MyFormControl('', Validators.pattern(this.regexValues.letterWithSpace)),
    new MyFormControl('', Validators.pattern(this.regexValues.letterWithSpace)),
    new MyFormControl('', Validators.pattern(this.regexValues.precio)),
    ]

  getFormGroupRegister(): any {
     return this.myRegisterFormGroup.formGroup
   }
  private myRegisterFormGroup: MyFormGroup;
  public nombreControlesRegister = ['Email', 'Password', 'ConfirmPassword', 'Nombre', 'Apellidos', 'Movil'];
  private controlesRegister = [
    new MyFormControl('', Validators.pattern(this.regexValues.email)),
    new MyFormControl('', Validators.pattern(this.regexValues.password)),
    new MyFormControl('', Validators.pattern(this.regexValues.password)),
    new MyFormControl('', Validators.pattern(this.regexValues.letterWithSpace)),
    new MyFormControl('', Validators.pattern(this.regexValues.letterWithSpace)),
    new MyFormControl('', Validators.pattern(this.regexValues.movil)),
   ]

  getFormGroupLogin(): any {
    return this.myLoginFormGroup.formGroup
  }
  private myLoginFormGroup: MyFormGroup;
  public nombreControlesLogin = ['Email', 'Password'];
  private controlesLogin = [
   new MyFormControl('', Validators.pattern(this.regexValues.email)),
   new MyFormControl('', Validators.pattern(this.regexValues.password)),
  ]
 
   constructor() {
     this.createAllRegister();
     this.createAllLogin();
     this.createAllAddPost();
     this.createAllEditPerfil();
    }
    
    createAllRegister(){
    this.myRegisterFormGroup = new MyFormGroup(this.nombreControlesRegister, this.controlesRegister);
    this.myRegisterFormGroup.insertarValidationMessages('Email', ['pattern'], ['Introduzca un email correcto']);
    this.myRegisterFormGroup.insertarValidationMessages('Password', ['pattern'], ['Introduzca 6 digitos']);
    this.myRegisterFormGroup.insertarValidationMessages('ConfirmPassword', ['pattern'], ['Introduzca 6 digitos']);
    this.myRegisterFormGroup.insertarValidationMessages('Nombre', ['pattern'], ['Introduzca caracteres y/o espacio/s']);
    this.myRegisterFormGroup.insertarValidationMessages('Apellidos', ['pattern'], ['Introduzca caracteres y/o espacio/s']);
    this.myRegisterFormGroup.insertarValidationMessages('Movil', ['pattern'], ['Introduzca un movil valido']);
  }
  
  createAllLogin(){
    this.myLoginFormGroup = new MyFormGroup(this.nombreControlesLogin, this.controlesLogin);
    this.myLoginFormGroup.insertarValidationMessages('Email', ['pattern'], ['Introduzca un email correcto']);
    this.myLoginFormGroup.insertarValidationMessages('Password', ['pattern'], ['Introduzca 6 digitos']);
   }

  createAllAddPost(){
    this.myAddPostFormGroup = new MyFormGroup(this.nombreControlesAddPost, this.controlesAddPost);
    this.myAddPostFormGroup.insertarValidationMessages('Titulo', ['pattern'], ['Introduzca caracteres y/o espacio/s']);
    this.myAddPostFormGroup.insertarValidationMessages('Descripcion', ['pattern'], ['Introduzca caracteres y/o espacio/s']);
    this.myAddPostFormGroup.insertarValidationMessages('Precio', ['pattern'], ['Introduzca 6 digitos']);
   }

   createAllEditPerfil(){
    this.myEditPerfilFormGroup = new MyFormGroup(this.nombreControlesEditPerfil, this.controlesEditPerfil);
    this.myEditPerfilFormGroup.insertarValidationMessages('Email', ['pattern'], ['Introduzca un email correcto']);
    this.myEditPerfilFormGroup.insertarValidationMessages('Password', ['pattern'], ['Introduzca 6 digitos']);
    this.myEditPerfilFormGroup.insertarValidationMessages('NewPassword', ['pattern'], ['Introduzca 6 digitos']);
    this.myEditPerfilFormGroup.insertarValidationMessages('Nombre', ['pattern'], ['Introduzca caracteres y/o espacio/s']);
    this.myEditPerfilFormGroup.insertarValidationMessages('Apellidos', ['pattern'], ['Introduzca caracteres y/o espacio/s']);
    this.myEditPerfilFormGroup.insertarValidationMessages('Movil', ['pattern'], ['Introduzca un movil valido']);
   }


  // validateControlRegister(element): boolean {
  //   return (
  //     this.myRegisterFormGroup.getControl(element).dirty &&
  //     !this.myRegisterFormGroup.getControl(element).valid)
  // }

  validateControlEditPerfilAll(): Array<boolean>{

    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesEditPerfil.length);
    let i = 0;
    
    this.nombreControlesEditPerfil.forEach(e =>{
      i++;
      if ((this.myEditPerfilFormGroup.getControl(e).dirty && 
      !this.myEditPerfilFormGroup.getControl(e).valid) ||
       (this.myEditPerfilFormGroup.getControl(e).value === undefined)) {
        validateAllControlArray[i] = false
      }else{
        validateAllControlArray[i] = true
      }
    })
    
    return validateAllControlArray;
  }

  getErrorMessageEditPerfilAll(array: Array<boolean>): Array<string>{
    let errorAllControlArray: Array<string> = new Array(this.nombreControlesEditPerfil.length);
    
    for (let i = 0; i < array.length-1; i++) {
      if (array[i+1] == true) {
        errorAllControlArray[i] = "Sin error"
      }else{
        console.log("i: " + i);
        
        console.log("nombreControl: " + this.nombreControlesEditPerfil[i]);
        
        let algo = this.myEditPerfilFormGroup.getControl(this.nombreControlesEditPerfil[i]);
        console.log(algo);
        let error = algo.errors
        console.log(error);
        
        // if (error != null) {
          errorAllControlArray[i] = algo.getValidationMessage(Object.keys(error)[0])
        // }
      }
    }

    return errorAllControlArray;
  }

  validateControlAddPostAll(): Array<boolean>{

    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesAddPost.length);
    let i = 0;
    
    this.nombreControlesAddPost.forEach(e =>{
      i++;
      if ((this.myAddPostFormGroup.getControl(e).dirty && 
      !this.myAddPostFormGroup.getControl(e).valid) ||
       (this.myAddPostFormGroup.getControl(e).value === undefined)) {
        validateAllControlArray[i] = false
      }else{
        validateAllControlArray[i] = true
      }
    })
    
    return validateAllControlArray;
  }

  getErrorMessageAddPostAll(array: Array<boolean>): Array<string>{
    let errorAllControlArray: Array<string> = new Array(this.nombreControlesAddPost.length);
    
    for (let i = 0; i < array.length-1; i++) {
      if (array[i+1] == true) {
        errorAllControlArray[i] = "Sin error"
      }else{
        console.log("i: " + i);
        
        console.log("nombreControl: " + this.nombreControlesAddPost[i]);
        
        let algo = this.myAddPostFormGroup.getControl(this.nombreControlesAddPost[i]);
        console.log(algo);
        let error = algo.errors
        console.log(error);
        
        // if (error != null) {
          errorAllControlArray[i] = algo.getValidationMessage(Object.keys(error)[0])
        // }
      }
    }

    return errorAllControlArray;
  }

  validateControlRegisterAll(): Array<boolean>{

    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesRegister.length);
    let i = 0;
    
    this.nombreControlesRegister.forEach(e =>{
      i++;
      if ((this.myRegisterFormGroup.getControl(e).dirty && 
      !this.myRegisterFormGroup.getControl(e).valid) ||
       (this.myRegisterFormGroup.getControl(e).value === undefined)) {
        validateAllControlArray[i] = false
      }else{
        validateAllControlArray[i] = true
      }
    })
    
    return validateAllControlArray;
  }
  
  getErrorMessageRegisterAll(array: Array<boolean>): Array<string>{
    let errorAllControlArray: Array<string> = new Array(this.nombreControlesRegister.length);
    
    for (let i = 0; i < array.length-1; i++) {
      if (array[i+1] == true) {
        errorAllControlArray[i] = "Sin error"
      }else{
        console.log("i: " + i);
        
        console.log("nombreControl: " + this.nombreControlesRegister[i]);
        
        let algo = this.myRegisterFormGroup.getControl(this.nombreControlesRegister[i]);
        console.log(algo);
        let error = algo.errors
        console.log(error);
        
        // if (error != null) {
          errorAllControlArray[i] = algo.getValidationMessage(Object.keys(error)[0])
        // }
      }
    }

    return errorAllControlArray;
  }

  //  getErrorMessageRegister(control) {
  //    let algo=this.myRegisterFormGroup.getControl(control)
  //   //  console.log("REGISTER SUCIO "+algo.dirty);    
  //    let errores= algo.errors;
  //    return algo.getValidationMessage(Object.keys(errores)[0]);
  //  }


  validateControlLoginAll(): Array<boolean>{

    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesLogin.length);
    let i = 0;
    
    this.nombreControlesLogin.forEach(e =>{
      i++;
      if (this.myLoginFormGroup.getControl(e).dirty && 
      !this.myLoginFormGroup.getControl(e).valid) {
        validateAllControlArray[i] = false
      }else{
        validateAllControlArray[i] = true
      }
    })
    
    return validateAllControlArray;
  }
  
  getErrorMessageLoginAll(array: Array<boolean>): Array<string>{
    let errorAllControlArray: Array<string> = new Array(this.nombreControlesLogin.length);
    
    for (let i = 0; i < array.length-1; i++) {
      if (array[i+1] == true) {
        errorAllControlArray[i] = "Sin error"
      }else{
        console.log("i: " + i);
        
        console.log("nombreControl: " + this.nombreControlesLogin[i]);
        
        let algo = this.myLoginFormGroup.getControl(this.nombreControlesLogin[i]);
        let error = algo.errors
        errorAllControlArray[i] = algo.getValidationMessage(Object.keys(error)[0])
      }
    }

    return errorAllControlArray;
  }
}
