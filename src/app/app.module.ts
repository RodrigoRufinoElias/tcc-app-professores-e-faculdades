import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './seguranca/auth.guard';
import * as ConfigReducers from './states/geral/reducers';
import * as AlunoReducers from './states/aluno/reducers';
import * as ProfessorReducers from './states/professor/reducers';
import * as FaculdadeReducers from './states/faculdade/reducers';
import { ConfiguracaoGeralEffects } from './states/geral/effects';
import { AlunoEffects } from './states/aluno/effects';
import { ProfessorEffects } from './states/professor/effects';
import { FaculdadeEffects } from './states/faculdade/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature(ConfigReducers.configuracaoGeralFeatureKey, ConfigReducers.reducers),
    StoreModule.forFeature(AlunoReducers.alunoFeatureKey, AlunoReducers.reducers),
    StoreModule.forFeature(FaculdadeReducers.faculdadeFeatureKey, FaculdadeReducers.reducers),
    StoreModule.forFeature(ProfessorReducers.professorFeatureKey, ProfessorReducers.reducers),
    EffectsModule.forFeature([
      ConfiguracaoGeralEffects,
      AlunoEffects,
      FaculdadeEffects,
      ProfessorEffects
    ])
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestoreModule,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
