import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderComentarioPageRoutingModule } from './responder-comentario-routing.module';

import { ResponderComentarioPage } from './responder-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponderComentarioPageRoutingModule
  ],
  declarations: [ResponderComentarioPage]
})
export class ResponderComentarioPageModule {}
