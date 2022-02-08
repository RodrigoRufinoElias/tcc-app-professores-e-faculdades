import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PesquisarProfessoresPageRoutingModule } from './pesquisar-professores-routing.module';
import { PesquisarProfessoresPage } from './pesquisar-professores.page';
import { SharedModule } from '../../utils/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarProfessoresPageRoutingModule,
    SharedModule
  ],
  declarations: [PesquisarProfessoresPage]
})
export class PesquisarProfessoresPageModule {}
