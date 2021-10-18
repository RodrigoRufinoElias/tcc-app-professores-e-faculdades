import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisarFaculdadesPageRoutingModule } from './pesquisar-faculdades-routing.module';

import { PesquisarFaculdadesPage } from './pesquisar-faculdades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarFaculdadesPageRoutingModule
  ],
  declarations: [PesquisarFaculdadesPage]
})
export class PesquisarFaculdadesPageModule {}
