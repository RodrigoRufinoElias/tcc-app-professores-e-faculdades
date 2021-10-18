import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentarFaculdadePageRoutingModule } from './comentar-faculdade-routing.module';

import { ComentarFaculdadePage } from './comentar-faculdade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentarFaculdadePageRoutingModule
  ],
  declarations: [ComentarFaculdadePage]
})
export class ComentarFaculdadePageModule {}
