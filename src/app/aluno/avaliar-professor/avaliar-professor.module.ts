import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliarProfessorPageRoutingModule } from './avaliar-professor-routing.module';

import { AvaliarProfessorPage } from './avaliar-professor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliarProfessorPageRoutingModule
  ],
  declarations: [AvaliarProfessorPage]
})
export class AvaliarProfessorPageModule {}
