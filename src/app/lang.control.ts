import {NgRedux} from '@angular-redux/store';
import {Component} from '@angular/core';
import {JsonFormsControl} from '@jsonforms/angular';
import {getLocale, JsonFormsState, setLocale} from '@jsonforms/core';

@Component({
  selector: 'app-lang-component',
  template:  `
    <p>Click button to set locale</p>
    <p>Current locale: {{currentLocale}}</p>
    <button mat-raised-button color="primary" (click)="changeLocale('de-DE')">de-DE</button>
    <button mat-raised-button color="primary" (click)="changeLocale('en-US')">en-US</button>
  `
})
export class LangComponent extends JsonFormsControl {

  currentLocale: string;

  constructor(protected ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
  }

  mapAdditionalProps() {
    this.currentLocale = getLocale(this.ngRedux.getState());
  }

  changeLocale(localeString: string) {
    this.ngRedux.dispatch(setLocale(localeString));
  }
}
