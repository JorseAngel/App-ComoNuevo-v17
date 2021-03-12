import { Post } from './../../../model/post.model';
import { UtilService } from './../../../servicios/util/util.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../servicios/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { PostVenta } from 'src/app/model/postVenta.model';
import { Usuario } from 'src/app/model/usuario.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { FavPostVenta } from 'src/app/model/favPostVenta';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-feed-venta',
  templateUrl: './feed-venta.page.html',
  styleUrls: ['./feed-venta.page.scss'],
})
export class FeedVentaPage implements OnInit {
  public postVentaModel = {} as PostVenta;
  dataFavPostVenta = {} as FavPostVenta;
  posts: any;

  constructor(
    /*private addFavService: AddFavService,*/
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private router: Router,
    private utilService:UtilService,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getData();
  }

  async addFav(idPost:string){
    let post =  {
      idPost: idPost,
      titulo: "",
      descripcion: "",
      precio: "",
      imagen: "",
    }

    this.authService.getUserAuth().subscribe((user) => {
      this.firestore
      .doc("postVenta/" + idPost)
      .valueChanges()
      .subscribe(data => {
        post.titulo = data["titulo"];
        post.descripcion = data["descripcion"];
        post.precio = data["precio"];
        post.imagen = data["imagen"];

        this.firestore.collection('favPostVenta_' + user.uid).doc(idPost).set(post);
      });
    })
  


    this.utilService.getToast("Añadido a favoritos", 2000, "bottom", "toastAddFav")
  }

  async getData(){
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
      this.firestore
        .collection("postVenta")
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

  openPostDetail(idPost: string) {
    this.router.navigate(["/detail-venta/" + idPost]);
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
