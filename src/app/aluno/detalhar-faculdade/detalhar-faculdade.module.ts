import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharFaculdadePageRoutingModule } from './detalhar-faculdade-routing.module';

import { DetalharFaculdadePage } from './detalhar-faculdade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharFaculdadePageRoutingModule
  ],
  declarations: [DetalharFaculdadePage]
})
export class DetalharFaculdadePageModule {}
