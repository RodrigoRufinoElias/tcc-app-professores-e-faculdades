import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private store: Store
  ) { }

  ngOnInit(){}

  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.authService.SendVerificationMail()
        this.router.navigate(['email-verificacao']);
      }).catch((error) => {
        this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
          { mensagemDeErro: error.message}
        ));
      })
  }

}
