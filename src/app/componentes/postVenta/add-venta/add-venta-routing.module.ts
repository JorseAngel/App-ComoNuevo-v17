import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVentaPage } from './add-venta.page';

const routes: Routes = [
  {
    path: '',
    component: AddVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVentaPageRoutingModule {}
