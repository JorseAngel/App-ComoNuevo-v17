import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavCompraPerfilPage } from './fav-compra-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: FavCompraPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavCompraPerfilPageRoutingModule {}
