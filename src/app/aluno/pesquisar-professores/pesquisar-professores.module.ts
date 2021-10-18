import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisarProfessoresPageRoutingModule } from './pesquisar-professores-routing.module';

import { PesquisarProfessoresPage } from './pesquisar-professores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarProfessoresPageRoutingModule
  ],
  declarations: [PesquisarProfessoresPage]
})
export class PesquisarProfessoresPageModule {}
