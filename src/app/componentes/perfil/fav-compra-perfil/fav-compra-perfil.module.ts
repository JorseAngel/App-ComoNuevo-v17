import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavCompraPerfilPageRoutingModule } from './fav-compra-perfil-routing.module';

import { FavCompraPerfilPage } from './fav-compra-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavCompraPerfilPageRoutingModule
  ],
  declarations: [FavCompraPerfilPage]
})
export class FavCompraPerfilPageModule {}
