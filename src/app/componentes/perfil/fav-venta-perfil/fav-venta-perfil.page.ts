import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UtilService } from 'src/app/servicios/util/util.service';

@Component({
  selector: 'app-fav-venta-perfil',
  templateUrl: './fav-venta-perfil.page.html',
  styleUrls: ['./fav-venta-perfil.page.scss'],
})
export class FavVentaPerfilPage implements OnInit {
  private idUser;
  public nombreUser;
  public posts: any;
  
  constructor(public act: ActivatedRoute,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private firestore: AngularFirestore,
              private utilService:UtilService,
              ) { 
    this.idUser = this.act.snapshot.paramMap.get('uuiCurrent');
    this.nombreUser = this.act.snapshot.paramMap.get('nombreCurrent');
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
    
  }

  async deleteFav(idPost:string){

    this.firestore.collection('favPostVenta_' + this.idUser).doc(idPost).delete();
    
    this.utilService.getToast("Eliminado de favoritos", 2000, "bottom", "toastDeleteFav")
  }

  async getData(){
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
      this.firestore
        .collection("favPostVenta_"+this.idUser)
        .snapshotChanges()
        .subscribe(data => {
          this.posts = data.map(e => {
            // if (e.payload.doc.data()["imagen"] == "data:,") {
            //   console.log("Contenido de la propiedad imagen: " + e.payload.doc.data()["imagen"]);
            // }
            return {
              id: e.payload.doc.id,
              titulo: e.payload.doc.data()["titulo"],
              descripcion: e.payload.doc.data()["descripcion"],
              precio: e.payload.doc.data()["precio"],
              imagen: e.payload.doc.data()["imagen"],
            };
          });
          console.log(this.posts);

          // dismiss loader
          loader.dismiss();
        });

        
    } catch (e) {
      this.showToast(e);
    }
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

}
