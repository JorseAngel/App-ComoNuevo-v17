import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedVentaPageRoutingModule } from './feed-venta-routing.module';

import { FeedVentaPage } from './feed-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedVentaPageRoutingModule
  ],
  declarations: [FeedVentaPage]
})
export class FeedVentaPageModule {}
