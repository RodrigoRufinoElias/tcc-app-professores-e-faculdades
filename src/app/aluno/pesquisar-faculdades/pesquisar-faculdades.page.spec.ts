import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PesquisarFaculdadesPage } from './pesquisar-faculdades.page';

describe('PesquisarFaculdadesPage', () => {
  let component: PesquisarFaculdadesPage;
  let fixture: ComponentFixture<PesquisarFaculdadesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarFaculdadesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisarFaculdadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
