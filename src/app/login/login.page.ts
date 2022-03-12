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

      let _email = this.email.trim().toLowerCase();
      let _password = this.password.trim();

      this.authService.SignIn(_email.trim().toLowerCase(), _password)
        .then(() => {
          timer(10).subscribe(() => {
            if(this.authService.isEmailVerified) {
              this.store.dispatch(ConfiguracaoGeralActions.verificarPerfilExistente({ email: _email }));
            } else {
              this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
                {
                  mensagemDeErro: 'Email não verificado'
                }
              ));
              this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
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
          this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
        });

      } else {
        this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
          { mensagemDeErro: 'E-mail inválido'}
        ));
      }
  }
}
