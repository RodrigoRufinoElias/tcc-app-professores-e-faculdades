import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliarFaculdadePageRoutingModule } from './avaliar-faculdade-routing.module';

import { AvaliarFaculdadePage } from './avaliar-faculdade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliarFaculdadePageRoutingModule
  ],
  declarations: [AvaliarFaculdadePage]
})
export class AvaliarFaculdadePageModule {}
