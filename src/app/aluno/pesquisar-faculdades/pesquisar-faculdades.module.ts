import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PesquisarFaculdadesPageRoutingModule } from './pesquisar-faculdades-routing.module';
import { PesquisarFaculdadesPage } from './pesquisar-faculdades.page';
import { SharedModule } from '../../utils/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarFaculdadesPageRoutingModule,
    SharedModule
  ],
  declarations: [PesquisarFaculdadesPage]
})
export class PesquisarFaculdadesPageModule {}
