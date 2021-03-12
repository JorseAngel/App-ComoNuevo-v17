import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedCompraPage } from './feed-compra.page';

const routes: Routes = [
  {
    path: '',
    component: FeedCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedCompraPageRoutingModule {}
