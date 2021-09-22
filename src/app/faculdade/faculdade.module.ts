import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaculdadePageRoutingModule } from './faculdade-routing.module';

import { FaculdadePage } from './faculdade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaculdadePageRoutingModule,
  ],
  declarations: [FaculdadePage]
})
export class FaculdadePageModule {}
