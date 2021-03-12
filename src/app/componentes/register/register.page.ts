import { UtilService } from './../../servicios/util/util.service';
import { ValidationService } from './../../servicios/validation/validation.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Usuario } from 'src/app/model/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email: string = "";
  public password: string = "";
  public confirmPassword: string;
  public nombre: string;
  public apellidos: string;
  public movil: string;
  public uid: string;

  catchDataArray = new Array(6);

  dataUser = {} as Usuario; 

  private canDo: any;
  public controlForm;
  public nombreControles;

  public validateAllControlArrayRegister: Array<boolean>;
  public errorAllControlArrayRegister: Array<string>;
  public mensajeErrorActivo: boolean = false;

  constructor(private authService: AuthService,
    private firestore: AngularFirestore,
    public router: Router,
    private alert: AlertController,
    private dataAuth: AngularFireAuth,
    public validationService: ValidationService,
    private utilService: UtilService
  ) {

    this.controlForm = validationService.getFormGroupRegister();
    this.nombreControles = validationService.nombreControlesRegister;

  }
  
  ngOnInit() {}

  public validateAndRegister(){

    if (!this.isEmptyFields()) {
      this.validateAllControlArrayRegister = this.validationService.validateControlRegisterAll()
      this.errorAllControlArrayRegister = this.validationService.getErrorMessageRegisterAll(this.validateAllControlArrayRegister);
      this.validateAllControlArrayRegister.forEach(e =>{
        console.log("validateAllControlArrayRegister: " + e);
      })
      this.errorAllControlArrayRegister.forEach(e =>{
        console.log("errorAllControlArrayRegister: " + e);
      })

      this.mensajeErrorActivo = true;
      
      let bandera = true;
      
      for (let i = 0; i < this.validateAllControlArrayRegister.length-1 && bandera; i++) {
        if(!this.validateAllControlArrayRegister[i+1]){
          bandera = false
        }
      }
      // alert("bandera: " + bandera)
      if (bandera) {
        this.registerUser();
      }
    }else{
      this.utilService.getToast("No se permiten campos vacios", 2000, "bottom", "toastDeleteFav")
      this.mensajeErrorActivo = false;
    }
  }

  public async registerUser() {

    this.giveDataOneToOne();

    if (this.password == this.confirmPassword) {
      try {
        const res = await this.dataAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        this.alertAll('Sucessful', 'Usuario registrado correctamente!!');

        // this.router.navigate(['/feed-venta']);

        this.authService.login(this.email,this.password).then(res =>{
          this.router.navigate(['/feed-venta']);
        }).catch(err => alert('Error inesperado'));

        await this.authService.getUserAuth().subscribe(async user => {
          this.dataUser.idUsuario = user.uid;
          this.dataUser.email = this.email;
          this.dataUser.password = this.password;
          this.dataUser.nombre = this.nombre;
          this.dataUser.apellidos = this.apellidos;
          this.dataUser.movil = this.movil;
  
            await this.firestore.collection("usuario").add(this.dataUser).then((docRef) =>{
              console.log(docRef);
              console.log("id de la coleccion (row) user ----> "+docRef.id + " [ANTES DE ACTUALIZAR]");
              this.dataUser.idDoc = docRef.id;
              this.firestore.doc("usuario/" + docRef.id).update(this.dataUser).then(() =>{
                console.log("Id de la coleccion concreta añadido a la row: " + this.dataUser.idDoc + " [DESPUES DE ACTUALIZAR]");
              });
            });
        })

        console.log('Response', res);

      } catch (e) {
        this.alertAll('ERROR', e.message);
      }
    } else {
      this.alertAll('ERROR', 'Contraseñas diferentes');
    }
  }

  public async alertAll(header: string, message: string) {
    this.canDo = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await this.canDo.present();
  }

  private isEmptyFields(){
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
        case 2:
          this.confirmPassword = this.catchDataArray[i]
          break;
        case 3:
          this.nombre = this.catchDataArray[i]
          break;
        case 4:
            this.apellidos = this.catchDataArray[i]
            break;
        case 5:
          this.movil = this.catchDataArray[i]
          break;
      
      }
    }
  }
}
