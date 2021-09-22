import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailVerificacaoPageRoutingModule } from './email-verificacao-routing.module';

import { EmailVerificacaoPage } from './email-verificacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVerificacaoPageRoutingModule
  ],
  declarations: [EmailVerificacaoPage]
})
export class EmailVerificacaoPageModule {}
