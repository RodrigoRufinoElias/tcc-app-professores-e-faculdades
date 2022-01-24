import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizarComentarioProfessorPage } from './visualizar-comentario-professor.page';

describe('VisualizarComentarioProfessorPage', () => {
  let component: VisualizarComentarioProfessorPage;
  let fixture: ComponentFixture<VisualizarComentarioProfessorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarComentarioProfessorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarComentarioProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
