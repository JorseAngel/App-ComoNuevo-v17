import { UtilService } from './../../servicios/util/util.service';
import { AuthService } from './../../servicios/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/servicios/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:string = "";
  public password:string = "";

  public validateAllControlArrayLogin: Array<boolean>;
  public errorAllControlArrayLogin: Array<string>;
  public mensajeErrorActivo: boolean = false;

  public controlForm;
  public nombreControles;
  catchDataArray = new Array(2);

  constructor(private authService: AuthService, 
              public router: Router,
              public validationService: ValidationService,
              private utilService: UtilService) { 
    console.log("Constructor ---> " + this.email);
    console.log("Constructor ---> " + this.password);

    this.controlForm = validationService.getFormGroupLogin();
    this.nombreControles = validationService.nombreControlesLogin;
  }

  ngOnInit() {
  }
  
  validateAndLogin(){
    
    if (!this.isEmptyFields()) {
      this.validateAllControlArrayLogin = this.validationService.validateControlLoginAll()
      this.errorAllControlArrayLogin = this.validationService.getErrorMessageLoginAll(this.validateAllControlArrayLogin);
      this.validateAllControlArrayLogin.forEach(e =>{
        console.log(e);
      })
      this.errorAllControlArrayLogin.forEach(e =>{
        console.log(e);
      })

      this.mensajeErrorActivo = true;
      let bandera = true;
      
      for (let i = 0; i < this.validateAllControlArrayLogin.length-1 && bandera; i++) {
        if(!this.validateAllControlArrayLogin[i+1]){
          bandera = false
        }
      }
      
      if (bandera) {
        this.onSubmitLogin();
      }
    }else{
      this.utilService.getToast("No se permiten campos vacios", 3000, "bottom", "toastDeleteFav")
      this.mensajeErrorActivo = false;
    }
    
  }
  
  public onSubmitLogin(){
    console.log("onSubmitLogin ---> " + this.email);
    console.log("onSubmitLogin ---> " + this.password);
    
    this.giveDataOneToOne();

    this.authService.login(this.email,this.password).then(res =>{
      this.router.navigate(['/feed-venta']);
    }).catch(err => this.utilService.getToast("Credenciales invalidas", 3000, "bottom", "toastDeleteFav"));
  }

  public accessRegistration(){
    this.router.navigate(['/register']);
  }

  private isEmptyFields(): boolean{
    for (let i = 0; i < this.catchDataArray.length; i++) {
      if (this.catchDataArray[i] === undefined || this.catchDataArray[i] == "") {
        return true
      }
    }
    return false;
  }

  private giveDataOneToOne(){
    for (let i = 0; i < this.catchDataArray.length; i++) {
      switch (i) {
        case 0:
          this.email = this.catchDataArray[i]
          break;
        case 1:
          this.password = this.catchDataArray[i]
          break;
      }
    }
  }
}
