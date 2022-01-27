import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentarProfessorPageRoutingModule } from './comentar-professor-routing.module';

import { ComentarProfessorPage } from './comentar-professor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentarProfessorPageRoutingModule
  ],
  declarations: [ComentarProfessorPage]
})
export class ComentarProfessorPageModule {}
