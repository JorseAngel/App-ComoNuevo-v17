import { PostCompra } from './../../../model/postCompra.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detail-compra',
  templateUrl: './detail-compra.page.html',
  styleUrls: ['./detail-compra.page.scss'],
})
export class DetailCompraPage implements OnInit {

  public idPost;
  public postCompraModel = {} as PostCompra;

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
      .doc("postCompra/" + this.idPost)
      .valueChanges()
      .subscribe(data => {
        this.postCompraModel.titulo = data["titulo"];
        this.postCompraModel.descripcion = data["descripcion"];
        this.postCompraModel.precio = data["precio"];
      });
  }

}
