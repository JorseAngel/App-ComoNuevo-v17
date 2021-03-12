import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UtilService } from 'src/app/servicios/util/util.service';

@Component({
  selector: 'app-my-post-venta',
  templateUrl: './my-post-venta.page.html',
  styleUrls: ['./my-post-venta.page.scss'],
})
export class MyPostVentaPage implements OnInit {

  private idUser;
  public nombreUser;
  public posts: any;
  private loader = this.utilService.getLoader('please await...');

  constructor(public act: ActivatedRoute,
              private firestore: AngularFirestore,
              private utilService: UtilService,
              private loadingCtrl: LoadingController,
              private router: Router) { 

    this.idUser = this.act.snapshot.paramMap.get('uuiCurrent');
    this.nombreUser = this.act.snapshot.paramMap.get('nombreCurrent');
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getData();
  }

  deleteMyPost(idPost){
    this.firestore.collection('postVenta').doc(idPost).delete();
    
    this.utilService.getToast("Post eliminado", 2000, "bottom", "toastDeleteFav");
  }

  pruebaDeScroll(idPost){
    this.router.navigate(["/detail-venta/" + idPost]);
  }

  async getData(){

    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    await this.firestore.collection('postVenta', (ref) => ref.where('idUsuario', '==', this.idUser)).snapshotChanges()
      .subscribe(data => {
        this.posts = data.map(e => {
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

  }

}
