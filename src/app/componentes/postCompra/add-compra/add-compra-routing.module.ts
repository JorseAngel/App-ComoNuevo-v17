import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCompraPage } from './add-compra.page';

const routes: Routes = [
  {
    path: '',
    component: AddCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCompraPageRoutingModule {}
