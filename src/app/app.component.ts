import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';

import * as ConfiguracaoGeralActions from './states/geral/actions';

import {
  selectIsLoading,
  selectIsLoggedIn,
  selectMensagemDeErro,
} from './states/geral/selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  mensagemDeErroDoSistema$: Observable<string>;

  loading: HTMLIonLoadingElement;

  constructor(
    private store: Store<any>,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {}

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingSpinner',
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    this.isLoading$ = this.store.pipe(
      select(selectIsLoading),
    );

    this.isLoggedIn$ = this.store.pipe(
      select(selectIsLoggedIn),
    );

    this.mensagemDeErroDoSistema$ = this.store.pipe(
      select(selectMensagemDeErro),
    );

    this.initLoading();
    this.initToast();
  }

  initLoading() {
    this.isLoading$.subscribe((isLoading) => {
      if(isLoading) {
        this.presentLoading();
      } else {
        this.dismissLoading();
      }
    });
  }

  initToast() {
    this.mensagemDeErroDoSistema$.subscribe((msg) => {
      if(msg != undefined) {
        this.presentToast(msg);
        this.store.dispatch(ConfiguracaoGeralActions.limpaMsgDeErro());
      }
    });
  }

  async presentLoading() {
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss().finally(async () => {
      this.loading = await this.loadingController.create({
        cssClass: 'loadingSpinner',
        spinner: 'bubbles',
        message: 'Aguarde...'
      });
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
