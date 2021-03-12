import { PostVenta } from './../../../model/postVenta.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { AccessGaleryService } from 'src/app/servicios/accessGalery/access-galery.service';
// import firebase from "firebase/app";
// import "firebase/firestore";
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/servicios/validation/validation.service';
import { UtilService } from 'src/app/servicios/util/util.service';
// import '@google-cloud/storage'

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.page.html',
  styleUrls: ['./add-venta.page.scss'],
})
export class AddVentaPage implements OnInit {

  public titulo: string;
  public descripcion: string;
  public precio: string;
  public image: any;

  public postVenta = {} as PostVenta; 

  private canDo: any;

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  private canvasElement: any;
  private background = new Image();

  private imgHeight;
  private imageResize = new Image();

  public validateAllControlArrayAddPost: Array<boolean>;
  public errorAllControlArrayAddPost: Array<string>;
  public mensajeErrorActivo: boolean = false;

  public controlForm;
  public nombreControles;
  catchDataArray = new Array(3);

  constructor(private authService: AuthService, 
              private firestore: AngularFirestore,
              private alert: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private galery: AccessGaleryService,
              private plt: Platform,
              public router: Router,
              public validationService: ValidationService,
              private utilService: UtilService) { 

    this.catchDataArray = [];
    this.controlForm = validationService.getFormGroupAddPost();
    this.nombreControles = validationService.nombreControlesAddPost;
  }
  
  ngOnInit() {
  }
  
  validateAndAdd(){
    if (!this.isEmptyFields()) {
      console.log("isEmptyFields: " + !this.isEmptyFields());
      
      this.validateAllControlArrayAddPost = this.validationService.validateControlAddPostAll()
      this.errorAllControlArrayAddPost = this.validationService.getErrorMessageAddPostAll(this.validateAllControlArrayAddPost);
      this.validateAllControlArrayAddPost.forEach(e =>{
        console.log(e);
      })
      this.errorAllControlArrayAddPost.forEach(e =>{
        console.log(e);
      })

      this.mensajeErrorActivo = true;
      let bandera = true;
      
      for (let i = 0; i < this.validateAllControlArrayAddPost.length-1 && bandera; i++) {
        if(!this.validateAllControlArrayAddPost[i+1]){
          bandera = false
        }
      }
      
      if (bandera) {
        this.publicarPost();
      }
    }else{
      this.utilService.getToast("No se permiten campos vacios", 3000, "bottom", "toastDeleteFav")
      this.mensajeErrorActivo = false;
    }
  }

  private isEmptyFields(){
    for (let i = 0; i < this.catchDataArray.length; i++) {
      if (this.catchDataArray[i] === undefined || this.catchDataArray[i] == "") {
        return true;
      }
    }
    return false;
  }

  private giveDataOneToOne(){
    for (let i = 0; i < this.catchDataArray.length; i++) {
      switch (i) {
        case 0:
          this.titulo = this.catchDataArray[i]
          break;
        case 1:
          this.descripcion = this.catchDataArray[i]
          break;
        case 2:
          this.precio = this.catchDataArray[i]
          break;
      }
    }
  }

  async publicarPost(){
      this.giveDataOneToOne()
      await this.authService.getUserAuth().subscribe(async (user) => {
        this.postVenta.idUsuario = user.uid;
        this.postVenta.titulo = this.titulo;
        this.postVenta.descripcion = this.descripcion;
        this.postVenta.precio = this.precio;
        this.postVenta.imagen = this.canvasElement.toDataURL();
        await this.firestore.collection("postVenta").add(this.postVenta).then(/*async*/ (docRef) => {
          console.log(docRef);
          console.log("idDelPost ----> "+docRef.id);
          this.postVenta.idPostVenta = docRef.id;
          this.firestore.doc("postVenta/" + docRef.id).update(this.postVenta).then(() =>{
            console.log("Id post de venta añadido a postVenta: " + this.postVenta.idPostVenta);
            
          });
          this.addImage(docRef.id, this.postVenta).then(() =>{
            console.log("Guardada");
          }).catch((e) => {
            console.log(e);
            this.alertAll('ERROR', e.message);
          });
          // await firebase.storage().ref().child('ImagenesVenta').child(docRef.id).child('img').putString(this.postVenta.imagen, 'data_url');
          // firebase.default.storage().ref().child('ImagenesVenta').child(docRef.id).child('img').putString(this.postVenta.imagen, 'data_url');
        });
      })
      this.router.navigate(['/feed-venta']);
  }

  addImage(idVenta, producto) {
    return firebase.default.storage().ref().child('ImagenesVenta').child(idVenta).child('img').putString(producto.imagen, 'data_url');
  }

  public async alertAll(header: string, message: string) {
    this.canDo = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await this.canDo.present();
  }

  public async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      cssClass: 'headerActionSheet',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'share',
          cssClass: 'galery',
          handler: () => {
            this.getGalery()
          }
        },
        {
          text: 'Use Camera',
          icon: 'camera',
          cssClass: 'camera',

          handler: () => {
            this.openCam()
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'cancelSheet'
        }
      ]
    });
    actionSheet.present();
  }

  private getGalery() {
    console.log("canvas element width: " +this.canvasElement.width );
    console.log("canvas element height: " +this.plt.height() * 0.20 );
    
    this.galery.openGalery().then((data: string) => {
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
      this.image = data;
      this.setBackground();
      // this.options();
    });

  }

  private openCam() {
    this.galery.openCamera().then((data: string) => {
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
      this.image = data;
      this.setBackground();
      // this.options();
    });
  }

  private setBackground() {
    this.background.src = this.image;
    this.background.onload = () => {
      this.resizeCanvasImage(this.background);
    }
  }

  private settings = {
    max_width: this.plt.width(),
    max_height: this.plt.height() - this.plt.height() * 0.15
  }

  private resizeCanvasImage(img) {
    var imgWidth = img.width;
    var imgHeight = img.height;
    var ratio = 1;
    var ratio1 = 1;
    var ratio2 = 1;
    ratio1 = this.settings.max_width / imgWidth;
    ratio2 = this.settings.max_height / imgHeight;
    // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box. 
    if (ratio1 < ratio2) { ratio = ratio1; } else { ratio = ratio2; }
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");
    var canvasCopy2 = document.createElement("canvas");
    var copyContext2 = canvasCopy2.getContext("2d"); canvasCopy.width = imgWidth; canvasCopy.height = imgHeight; copyContext.drawImage(img, 0, 0);
    // init 
    canvasCopy2.width = imgWidth; canvasCopy2.height = imgHeight;
    copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
    var rounds = 2; var roundRatio = ratio * rounds; for (var i = 1; i <= rounds; i++) {
      // tmp 
      canvasCopy.width = imgWidth * roundRatio / i;
      canvasCopy.height = imgHeight * roundRatio / i;
      copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);
      // copy back 
      canvasCopy2.width = imgWidth * roundRatio / i;
      canvasCopy2.height = imgHeight * roundRatio / i;
      copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
    }
    // end for // copy back to canvas 
    this.canvasElement.width = imgWidth * roundRatio / rounds;
    this.canvasElement.height = imgHeight * roundRatio / rounds;
    this.imgHeight = this.canvasElement.height;
    this.imageResize.src = canvasCopy2.toDataURL();
    this.imageResize.onload = () => {
      this.ctx.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }

  ionViewDidEnter() {
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasPosition = this.canvasElement.getBoundingClientRect();
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
  }

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.imgHeight;
  }
}
