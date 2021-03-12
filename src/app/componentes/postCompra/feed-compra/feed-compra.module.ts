import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedCompraPageRoutingModule } from './feed-compra-routing.module';

import { FeedCompraPage } from './feed-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedCompraPageRoutingModule
  ],
  declarations: [FeedCompraPage]
})
export class FeedCompraPageModule {}
