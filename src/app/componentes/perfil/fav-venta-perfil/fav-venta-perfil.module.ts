import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavVentaPerfilPageRoutingModule } from './fav-venta-perfil-routing.module';

import { FavVentaPerfilPage } from './fav-venta-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavVentaPerfilPageRoutingModule
  ],
  declarations: [FavVentaPerfilPage]
})
export class FavVentaPerfilPageModule {}
