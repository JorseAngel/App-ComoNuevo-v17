import { PostCompra } from './../../../model/postCompra.model';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { AccessGaleryService } from 'src/app/servicios/accessGalery/access-galery.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UtilService } from 'src/app/servicios/util/util.service';
import { ValidationService } from 'src/app/servicios/validation/validation.service';

@Component({
  selector: 'app-add-compra',
  templateUrl: './add-compra.page.html',
  styleUrls: ['./add-compra.page.scss'],
})
export class AddCompraPage implements OnInit {

  public titulo: string;
  public descripcion: string;
  public precio: string;

  public postCompra = {} as PostCompra; 

  private canDo: any;

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
        this.postCompra.idUsuario = user.uid;
        this.postCompra.titulo = this.titulo;
        this.postCompra.descripcion = this.descripcion;
        this.postCompra.precio = this.precio;
        await this.firestore.collection("postCompra").add(this.postCompra).then(/*async*/ (docRef) => {
          console.log(docRef);
          console.log("idDelPost ----> "+docRef.id);
          this.postCompra.idPostCompra = docRef.id;
          this.firestore.doc("postCompra/" + docRef.id).update(this.postCompra).then(() =>{
            console.log("Id post de compra añadido a postCompra: " + this.postCompra.idPostCompra);
            
          });
        });
      })
      this.router.navigate(['/feed-compra']);
  }


  public async alertAll(header: string, message: string) {
    this.canDo = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await this.canDo.present();
  }






}
