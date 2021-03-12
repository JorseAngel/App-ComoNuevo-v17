import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    public toastController: ToastController
  ) {}

  async getLoader(message: string, duration?: number) {
    if (duration) {
      return await this.loadingCtrl.create({
        message: message,
        duration: duration,
      });
    } else {
      return await this.loadingCtrl.create({
        message: message,
      });
    }
  }

  async getAlert(header: string, message: string) {
    let alerta = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alerta.present();
  }

  async getToast(message:string, duration:number, position, cssClass){
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: cssClass,
    });
    toast.present();
  }
}
