import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharProfessorPageRoutingModule } from './detalhar-professor-routing.module';

import { DetalharProfessorPage } from './detalhar-professor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharProfessorPageRoutingModule
  ],
  declarations: [DetalharProfessorPage]
})
export class DetalharProfessorPageModule {}
