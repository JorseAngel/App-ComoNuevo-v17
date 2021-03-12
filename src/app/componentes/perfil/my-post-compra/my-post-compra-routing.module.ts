import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPostCompraPage } from './my-post-compra.page';

const routes: Routes = [
  {
    path: '',
    component: MyPostCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPostCompraPageRoutingModule {}
