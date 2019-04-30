import JsonRefs from 'json-refs';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {isDevMode, NgModule} from '@angular/core';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {Actions, JsonFormsState, setLocale, UISchemaElement} from '@jsonforms/core';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import AJV from 'ajv';
import { parsePhoneNumber } from 'libphonenumber-js';
import logger from 'redux-logger';

import { initialState, rootReducer } from './store';
import data from './data';

import { AppComponent } from './app.component';
import {CustomAutocompleteControlRenderer} from './custom.autocomplete';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@angular/material';
import { LangComponent } from './lang.control';
import { DataDisplayComponent } from './data.control';
import { JsonFormsModule } from '@jsonforms/angular';
import { LocaleValidationModule, TranslationModule } from 'angular-l10n';

@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer,
    LangComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    LocaleValidationModule.forRoot(),
    TranslationModule.forRoot({}),
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  schemas: [],
  providers: [],
  entryComponents: [CustomAutocompleteControlRenderer, LangComponent, DataDisplayComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<JsonFormsState>,
    devTools: DevToolsExtension,
    http: HttpClient
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

    ngRedux.dispatch(setLocale('de-DE'));

    http.get('./assets/uischema.json')
      .forEach((uischema) => {
        http.get('./assets/schema.json')
          .forEach((schema) =>
            JsonRefs.resolveRefs(schema)
              .then(
                (res: any) =>
                  ngRedux.dispatch(
                    Actions.init(
                      data,
                      res.resolved,
                      uischema as UISchemaElement,
                      ajv
                    )
                  )
              )
          );
      });
  }
}
