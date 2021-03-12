import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPostVentaPage } from './my-post-venta.page';

const routes: Routes = [
  {
    path: '',
    component: MyPostVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPostVentaPageRoutingModule {}
