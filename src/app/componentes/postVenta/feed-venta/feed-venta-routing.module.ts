import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedVentaPage } from './feed-venta.page';

const routes: Routes = [
  {
    path: '',
    component: FeedVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedVentaPageRoutingModule {}
