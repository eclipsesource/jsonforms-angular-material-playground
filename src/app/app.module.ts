import * as JsonRefs from 'json-refs';
import { BrowserModule } from '@angular/platform-browser';

import {isDevMode, NgModule} from '@angular/core';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {Actions, JsonFormsState, UISchemaElement} from '@jsonforms/core';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import * as AJV from 'ajv';
import { parsePhoneNumber } from 'libphonenumber-js';
import logger from 'redux-logger';

import { initialState, rootReducer } from './store';
import data from './data';
import schema from './schema';
import uischema from './uischema';

import { AppComponent } from './app.component';
import {CustomAutocompleteControlRenderer} from './custom.autocomplete';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer
  ],
  imports: [
    BrowserModule,
    JsonFormsAngularMaterialModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  schemas: [],
  providers: [],
  entryComponents: [CustomAutocompleteControlRenderer],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<JsonFormsState>,
    devTools: DevToolsExtension
  ) {
    let enhancers = [];
    // ... add whatever other enhancers you want.

    // You probably only want to expose this tool in devMode.
    if (isDevMode() && devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }

    ngRedux.configureStore(
      rootReducer,
      initialState,
      [logger],
      enhancers
    );


    // resembles createAjv, which is currently not exported
    const ajv = new AJV({
      schemaId: 'auto',
      allErrors: true,
      jsonPointers: true,
      errorDataPath: 'property'
    });
    ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    ajv.addFormat('tel', maybePhoneNumber => {
      try {
        parsePhoneNumber(maybePhoneNumber, 'DE');
        return true;
      } catch (_) {
        return false;
      }
    });

    JsonRefs.resolveRefs(schema)
      .then(
        res =>
          ngRedux.dispatch(Actions.init(
            data,
            res.resolved,
            // TODO: cast shouldn't be necessary
            uischema as UISchemaElement,
            ajv
          ))
      );

  }
}
