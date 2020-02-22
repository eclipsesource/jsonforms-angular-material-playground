import { Component } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';
import { JSONFormsAngularService } from '@jsonforms/angular/lib/jsonforms.service';

@Component({
  selector: 'app-data-component',
  template: '<pre>{{dataAsString}}</pre>'
})
export class DataDisplayComponent extends JsonFormsControl {

  dataAsString: string;

  constructor(service: JSONFormsAngularService) {
    super(service);
  }

  public mapAdditionalProps(props: ControlProps) {
    this.dataAsString = JSON.stringify(props.data, null, 2);
  }
}
