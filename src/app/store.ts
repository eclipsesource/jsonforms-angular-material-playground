import { combineReducers, Reducer } from 'redux';
import {
  jsonformsReducer,
  JsonFormsState,
} from '@jsonforms/core';

import { angularMaterialRenderers } from '@jsonforms/angular-material';

export const rootReducer: Reducer<JsonFormsState> = combineReducers({ jsonforms: jsonformsReducer() });

export const initialState: any = {
  jsonforms: {
    renderers: angularMaterialRenderers,
    fields: [],
  }
};
