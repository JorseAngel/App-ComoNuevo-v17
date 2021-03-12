import { Usuario } from './../../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  private canDo: any;
  public usuarioModel = {} as Usuario;

  constructor(
    private AFauth: AngularFireAuth,
    private alert: AlertController,
    public router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.usuarioModel = this.authService.getDataUser();
    console.log("ID_Usuario_actual: " + this.usuarioModel.idUsuario);
    console.log("NOMBRE_Usuario_actual: " + this.usuarioModel.nombre);
    
  }

  async closeSession() {
    this.AFauth.signOut().then(() => {
      this.alertAll('Sesion acabada', 'Sesion cerrada correctamente');
      this.router.navigate(['/home']);
    }).catch(() => this.alertAll('ERROR', 'Error al cerrar la sesion'));
    
  }

  public async alertAll(header: string, message: string) {
    this.canDo = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await this.canDo.present();
  }

  // public openFavVentas(){
  //   this.router.navigate(["/fav-venta-perfil/" + this.usuarioModel.idUsuario + "/" + this.usuarioModel.nombre]);
  // }


}
