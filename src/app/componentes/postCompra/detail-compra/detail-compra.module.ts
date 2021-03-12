import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCompraPageRoutingModule } from './detail-compra-routing.module';

import { DetailCompraPage } from './detail-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCompraPageRoutingModule
  ],
  declarations: [DetailCompraPage]
})
export class DetailCompraPageModule {}
