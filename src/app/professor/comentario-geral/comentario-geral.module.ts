import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentarioGeralPageRoutingModule } from './comentario-geral-routing.module';

import { ComentarioGeralPage } from './comentario-geral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentarioGeralPageRoutingModule
  ],
  declarations: [ComentarioGeralPage]
})
export class ComentarioGeralPageModule {}
