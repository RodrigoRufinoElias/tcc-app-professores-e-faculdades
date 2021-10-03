import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FaculdadeService } from '../services/faculdade.service';

@Component({
  selector: 'app-faculdade',
  templateUrl: './faculdade.page.html',
  styleUrls: ['./faculdade.page.scss'],
})
export class FaculdadePage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private fs: FaculdadeService,
  ) { }

  ngOnInit() {
  }

}
