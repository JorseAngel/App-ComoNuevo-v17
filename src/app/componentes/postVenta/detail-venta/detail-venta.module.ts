import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailVentaPageRoutingModule } from './detail-venta-routing.module';

import { DetailVentaPage } from './detail-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailVentaPageRoutingModule
  ],
  declarations: [DetailVentaPage]
})
export class DetailVentaPageModule {}
