import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPostCompraPageRoutingModule } from './my-post-compra-routing.module';

import { MyPostCompraPage } from './my-post-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPostCompraPageRoutingModule
  ],
  declarations: [MyPostCompraPage]
})
export class MyPostCompraPageModule {}
