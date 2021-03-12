import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioModel = {} as Usuario;
  // public currentUID

  constructor(
    private AFauth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
      // this.AFauth.authState.subscribe((user) =>{
      //   this.currentUID = user.uid;
      // })
  }

  public login(email: string, password: string) {
    console.log(email);
    console.log(password);
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => rejected(err));
    });
  }

  getUserAuth() {
    return this.AFauth.authState;
  }

  getDataUser(): Usuario {
    // this.firestore.collection("usuario").snapshotChanges().subscribe((user) =>{
    //   user.map()
    // })

    this.getUserAuth().subscribe(async (user) => {
      await this.getCurrentUserCollection(user.uid).subscribe((current) => {
        current.forEach(data =>{
          this.usuarioModel.idUsuario = data.get("idUsuario");
          this.usuarioModel.nombre = data.get("nombre");
          this.usuarioModel.apellidos = data.get("apellidos");
          this.usuarioModel.email = data.get("email");
          this.usuarioModel.movil = data.get("movil");
          this.usuarioModel.password = data.get("password");
        })
      });
    });

    return this.usuarioModel;
  }

  getCurrentUserCollection(idCurrent: string) {
    return this.firestore
      .collection('usuario', (ref) => ref.where('idUsuario', '==', idCurrent))
      .get();
  }
}
