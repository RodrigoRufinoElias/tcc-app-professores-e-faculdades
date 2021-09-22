import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailVerificacaoPage } from './email-verificacao.page';

const routes: Routes = [
  {
    path: '',
    component: EmailVerificacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailVerificacaoPageRoutingModule {}
