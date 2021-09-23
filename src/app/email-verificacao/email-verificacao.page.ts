import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../seguranca/autenticacao.service';

@Component({
  selector: 'app-email-verificacao',
  templateUrl: './email-verificacao.page.html',
  styleUrls: ['./email-verificacao.page.scss'],
})
export class EmailVerificacaoPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  enviarEmailConfirmacao() {
    this.authService.SendVerificationMail();
  }

  voltarLogin() {
    this.router.navigate(['login']);
  }
}
