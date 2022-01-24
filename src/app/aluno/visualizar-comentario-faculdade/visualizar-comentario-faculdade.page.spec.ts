import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizarComentarioFaculdadePage } from './visualizar-comentario-faculdade.page';

describe('VisualizarComentarioFaculdadePage', () => {
  let component: VisualizarComentarioFaculdadePage;
  let fixture: ComponentFixture<VisualizarComentarioFaculdadePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarComentarioFaculdadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarComentarioFaculdadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
