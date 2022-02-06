import { Component } from '@angular/core';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public appVersion: string = packageJson.version;

  constructor() {}

}
