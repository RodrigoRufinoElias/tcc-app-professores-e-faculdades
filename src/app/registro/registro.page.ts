import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  email: string = '';
  password: string = '';

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private store: Store
  ) { }

  formOK() {
    let _email = this.email ? this.email.trim() : null;
    let _password = this.password ? this.password.trim() : null;

    if (_email && _password) {
      return true;
    } else {
      return false;
    }
  }

  validateEmail() {
    return this.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  signUp(){
    if (this.validateEmail()) {
      this.authService.RegisterUser(this.email, this.password)
      .then(() => {
        this.authService.SendVerificationMail()
        this.router.navigate(['email-verificacao']);
      })
      .catch((error) => {
        this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
          { mensagemDeErro: error.message}
        ));
      })
      .finally(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})));
    } else {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        { mensagemDeErro: 'E-mail inválido'}
      ));
    }
  }
}
