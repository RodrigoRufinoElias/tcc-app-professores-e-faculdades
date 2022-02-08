import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private store: Store<any>,
    private authService: AuthenticationService
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

  logIn() {
    if (this.validateEmail()) {

      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}));

      this.authService.SignIn(this.email, this.password)
        .then(() => {
          timer(10).subscribe(() => {
            if(this.authService.isEmailVerified) {
              this.store.dispatch(ConfiguracaoGeralActions.verificarPerfilExistente({ email: this.email }));
            } else {
              this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
                {
                  mensagemDeErro: 'Email não verificado'
                }
              ));
              return false;
            }
          });
        })
        .catch((error) => {
          this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
            {
              mensagemDeErro: error.message
            }
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
