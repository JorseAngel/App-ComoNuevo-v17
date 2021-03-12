import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UtilService } from 'src/app/servicios/util/util.service';

@Component({
  selector: 'app-feed-compra',
  templateUrl: './feed-compra.page.html',
  styleUrls: ['./feed-compra.page.scss'],
})
export class FeedCompraPage implements OnInit {
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
    }

    this.authService.getUserAuth().subscribe((user) => {
      this.firestore
      .doc("postCompra/" + idPost)
      .valueChanges()
      .subscribe(data => {
        post.titulo = data["titulo"];
        post.descripcion = data["descripcion"];
        post.precio = data["precio"];

        this.firestore.collection('favPostCompra_' + user.uid).doc(idPost).set(post);
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
        .collection("postCompra")
        .snapshotChanges()
        .subscribe(data => {
          this.posts = data.map(e => {
            return {
              id: e.payload.doc.id,
              titulo: e.payload.doc.data()["titulo"],
              descripcion: e.payload.doc.data()["descripcion"],
              precio: e.payload.doc.data()["precio"],
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
    this.router.navigate(["/detail-compra/" + idPost]);
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
