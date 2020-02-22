import { Component } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { getLocale, setLocale } from '@jsonforms/core';
import { JSONFormsAngularService } from '@jsonforms/angular/lib/jsonforms.service';

@Component({
  selector: 'app-lang-component',
  template: `
    <p>Click button to set locale</p>
    <p>Current locale: {{currentLocale}}</p>
    <button mat-raised-button color="primary" (click)="changeLocale('de-DE')">de-DE</button>
    <button mat-raised-button color="primary" (click)="changeLocale('en-US')">en-US</button>
  `
})
export class LangComponent extends JsonFormsControl {

  currentLocale: string;

  constructor(service: JSONFormsAngularService) {
    super(service);
  }

  mapAdditionalProps() {
    this.currentLocale = getLocale(this.jsonFormsService.getState());
  }

  changeLocale(localeString: string) {
    this.jsonFormsService.updateLocale(setLocale(localeString));
  }
}
