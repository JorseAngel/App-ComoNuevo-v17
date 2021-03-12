import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailVentaPage } from './detail-venta.page';

const routes: Routes = [
  {
    path: '',
    component: DetailVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailVentaPageRoutingModule {}
