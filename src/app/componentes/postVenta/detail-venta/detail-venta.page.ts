import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PostVenta } from 'src/app/model/postVenta.model';

@Component({
  selector: 'app-detail-venta',
  templateUrl: './detail-venta.page.html',
  styleUrls: ['./detail-venta.page.scss'],
})
export class DetailVentaPage implements OnInit {
  public idPost;
  public postVentaModel = {} as PostVenta;

  constructor(public act: ActivatedRoute, 
              private firestore: AngularFirestore) {
    this.idPost = this.act.snapshot.paramMap.get('idPost');
    console.log('Id del POST PULSADO: ' + this.idPost);

    // this.item = JSON.parse(this.act.snapshot.paramMap.get('item'));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPostById();
  }

  getPostById() {
    this.firestore
      .doc("postVenta/" + this.idPost)
      .valueChanges()
      .subscribe(data => {
        this.postVentaModel.titulo = data["titulo"];
        this.postVentaModel.descripcion = data["descripcion"];
        this.postVentaModel.precio = data["precio"];
        this.postVentaModel.imagen = data["imagen"];

        // dismiss loader
        // loader.dismiss();
      });
  }

}
