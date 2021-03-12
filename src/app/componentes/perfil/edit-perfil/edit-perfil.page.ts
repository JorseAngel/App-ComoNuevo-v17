import { UtilService } from './../../../servicios/util/util.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { off } from 'process';
import { ValidationService } from 'src/app/servicios/validation/validation.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {
  public usuarioModel = {} as Usuario;
  public newPassword: string;
  public contador: number = 0;
  public textPasswordCurrent = false;
  public textPasswordNew = false;

  catchDataArray = new Array(6);
  public controlForm;
  public nombreControles;

  public validateAllControlArrayEditPerfil: Array<boolean>;
  public errorAllControlArrayEditPerfil: Array<string>;
  public mensajeErrorActivo: boolean = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private utilService: UtilService,
    public validationService: ValidationService,
  ) {
    this.controlForm = validationService.getFormGroupEditPerfil();
    this.nombreControles = validationService.nombreControlesEditPerfil;
    console.log(this.nombreControles);
    
  }


  ngOnInit() {}

  async ionViewWillEnter() {
    let loader = this.utilService.getLoader('please await...');
    (await loader).present();
    this.usuarioModel = await this.authService.getDataUser();
    (await loader).dismiss();
  }

  public validateAndEdit(){

    if (!this.isEmptyFields()) {
      this.validateAllControlArrayEditPerfil= this.validationService.validateControlEditPerfilAll()
      this.errorAllControlArrayEditPerfil = this.validationService.getErrorMessageEditPerfilAll(this.validateAllControlArrayEditPerfil);
      this.validateAllControlArrayEditPerfil.forEach(e =>{
        console.log("validateAllControlArrayEditPerfil: " + e);
      })
      this.errorAllControlArrayEditPerfil.forEach(e =>{
        console.log("errorAllControlArrayEditPerfil: " + e);
      })
      this.mensajeErrorActivo = true;
      let bandera = true;
      
      for (let i = 0; i < this.validateAllControlArrayEditPerfil.length-1 && bandera; i++) {
        if(!this.validateAllControlArrayEditPerfil[i+1]){
          bandera = false;
        }
      }
      // alert("bandera: " + bandera)
      if (bandera) {
        this.editarPerfil();
      }
    }else{
      this.utilService.getToast("No se permiten campos vacios", 2000, "bottom", "toastDeleteFav")
      this.mensajeErrorActivo = false;
    }
  }

  async editarPerfil() {
    console.log(this.usuarioModel.nombre);
    this.giveDataOneToOne();
      if (this.newPassword == this.usuarioModel.password) {
        await this.authService.getUserAuth().subscribe(async (user) =>{
          await this.getCurrentUserCollection(user.uid).subscribe((current) => {
            current.forEach(data =>{
              this.usuarioModel.idDoc = data.get("idDoc");
              this.updateDoc(this.usuarioModel.idDoc).then((e) => {
                this.router.navigate(['/mi-perfil']);
              })
          })
        });
      })
    }else {
        this.utilService.getAlert('Error', 'Las contraseñas no coinciden');
      }
  }

  async updateDoc(idDoc: string) {
    let loader = this.utilService.getLoader('please await...');
    (await loader).present();
    await this.firestore.doc('usuario/' + idDoc).update(this.usuarioModel);
    (await loader).dismiss();
  }

  getCurrentUserCollection(idCurrent: string) {
    return this.firestore
      .collection('usuario', (ref) => ref.where('idUsuario', '==', idCurrent))
      .get();
  }

  probando(){
    document.getElementById("idPrueba").innerHTML = ""
  }

  showCurrentPassword(){
    if (this.textPasswordCurrent) {
      this.textPasswordCurrent = false;
    }else{
      this.textPasswordCurrent = true;
    }
    
  }
  
  showNewPassword(){
    if (this.textPasswordNew) {
      this.textPasswordNew = false;
    }else{
      this.textPasswordNew = true;
    }
    
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
          this.usuarioModel.email = this.catchDataArray[i]
          break;
        case 1:
          this.usuarioModel.password = this.catchDataArray[i]
          break;
        case 2:
          this.newPassword = this.catchDataArray[i]
          break;
        case 3:
          this.usuarioModel.nombre = this.catchDataArray[i]
          break;
        case 4:
            this.usuarioModel.apellidos = this.catchDataArray[i]
            break;
        case 5:
          this.usuarioModel.movil = this.catchDataArray[i]
          break;
      
      }
    }
  }

}
