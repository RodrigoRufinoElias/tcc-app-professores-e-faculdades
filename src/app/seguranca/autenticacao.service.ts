import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

import { User } from "../models/usuario.model";
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private store: Store,
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login com email/senha
  async SignIn(email, password) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Cadastrar usuário com email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Verificação de email quando cadastro de novo usuário
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['email-verificacao']);
    })
  }

  // Recuperação de senha
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        {
          mensagemDeErro: "O email de recuperação de senha foi enviado. Favor olhar a caixa de entrada."
        }
      ));
    }).catch((error) => {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        { mensagemDeErro: error.message}
      ));
    })
  }

  // Retorna true quando o usuário está logado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Retorna true quando o email do usuário está verificado
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Retorna o email do usuário
  get userEmail(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.email;
  }

  // Login com Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        {
          mensagemDeErro: error.message
        }
      ));
    })
  }

  // Guarda o usuário no localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Logout
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}
