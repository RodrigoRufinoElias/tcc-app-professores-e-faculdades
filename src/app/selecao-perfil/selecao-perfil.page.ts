import { Component, OnInit } from '@angular/core';

import { PerfilService } from '../services/perfil.service';
import { Aluno } from '../models/aluno.model';

@Component({
  selector: 'app-selecao-perfil',
  templateUrl: './selecao-perfil.page.html',
  styleUrls: ['./selecao-perfil.page.scss'],
})
export class SelecaoPerfilPage implements OnInit {

  perfis = [];

  constructor(private perfilService: PerfilService) { }

  ngOnInit() {}

  obterPerfil() {
    // this.perfilService.obterPerfil();
    this.perfilService.verificarPerfilExistente('faculdade.nome@teste.com');
  }

  criarPerfilFakeAluno() {
    this.perfilService.criarPerfilFakeAluno({
      id: 2,
      nome: "teste2",
      email: "aluno2.nome@teste.com"
    }).then(res => {
      console.log('criarPerfilFakeAluno', res)
    }).catch(error => console.log(error));
  }

  criarPerfilFakeProfessor() {
    this.perfilService.criarPerfilFakeProfessor({
      id: 2,
      nome: "teste2",
      email: "professor2.nome@teste.com"
    }).then(res => {
      console.log('criarPerfilFakeProfessor', res)
    }).catch(error => console.log(error));
  }

  criarPerfilFakeFaculdade() {
    this.perfilService.criarPerfilFakeFaculdade({
      id: 1,
      nome: "teste",
      email: "faculdade.nome@teste.com",
      siteOficial: "https://www.faculdadeFake.com/"
    }).then(res => {
      console.log('criarPerfilFakeFaculdade', res)
    }).catch(error => console.log(error));
  }
}
