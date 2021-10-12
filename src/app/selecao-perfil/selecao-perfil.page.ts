import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-selecao-perfil',
  templateUrl: './selecao-perfil.page.html',
  styleUrls: ['./selecao-perfil.page.scss'],
})
export class SelecaoPerfilPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  configPerfilAluno() {
    this.router.navigate(['config-perfil/aluno']);
  }

  configPerfilFaculdade() {
    this.router.navigate(['config-perfil/faculdade']);
  }

  configPerfilProfessor() {
    this.router.navigate(['config-perfil/professor']);
  }
}
