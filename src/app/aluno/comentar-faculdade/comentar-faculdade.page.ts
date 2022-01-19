import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentar-faculdade',
  templateUrl: './comentar-faculdade.page.html',
  styleUrls: ['./comentar-faculdade.page.scss'],
})
export class ComentarFaculdadePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  comentar() {
    // this.store.dispatch(AlunoActions.comentarFaculdade({
    //   idFaculdade: this.idFaculdade,
    //   idAluno: this.idAluno,
    //   comentario: 'comentário teste'
    // }));
  }
}
