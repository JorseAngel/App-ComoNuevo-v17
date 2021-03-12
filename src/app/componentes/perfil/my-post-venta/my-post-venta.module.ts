import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPostVentaPageRoutingModule } from './my-post-venta-routing.module';

import { MyPostVentaPage } from './my-post-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPostVentaPageRoutingModule
  ],
  declarations: [MyPostVentaPage]
})
export class MyPostVentaPageModule {}
