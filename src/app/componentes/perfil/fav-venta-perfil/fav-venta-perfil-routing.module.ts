import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavVentaPerfilPage } from './fav-venta-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: FavVentaPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavVentaPerfilPageRoutingModule {}
