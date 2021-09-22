import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../seguranca/autenticacao.service';

@Component({
  selector: 'app-email-verificacao',
  templateUrl: './email-verificacao.page.html',
  styleUrls: ['./email-verificacao.page.scss'],
})
export class EmailVerificacaoPage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
