import * as JsonRefs from 'json-refs';
import { BrowserModule } from '@angular/platform-browser';

import {isDevMode, NgModule} from '@angular/core';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {Actions, JsonFormsState, UISchemaElement} from '@jsonforms/core';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import logger from 'redux-logger';

import { initialState, rootReducer } from './store';
import data from './data';
import schema from './schema';
import uischema from './uischema';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JsonFormsAngularMaterialModule,
  ],
  schemas: [],
  providers: [],
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

    JsonRefs.resolveRefs(schema)
      .then(
        res =>
          ngRedux.dispatch(Actions.init(
            data,
            res.resolved,
            // TODO: cast shouldn't be necessary
            uischema as UISchemaElement
          ))
      );
  }
}
