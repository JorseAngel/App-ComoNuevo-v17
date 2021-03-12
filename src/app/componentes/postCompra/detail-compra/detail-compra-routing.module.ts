import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCompraPage } from './detail-compra.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCompraPageRoutingModule {}
