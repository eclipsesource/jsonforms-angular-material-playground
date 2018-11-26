import {combineReducers, Reducer} from 'redux';
import {and, jsonformsReducer, JsonFormsState, rankWith, schemaTypeIs, scopeEndsWith, Tester,} from '@jsonforms/core';

import {angularMaterialRenderers} from '@jsonforms/angular-material';
import {CustomAutocompleteControlRenderer} from './custom.autocomplete';

export const rootReducer: Reducer<JsonFormsState> = combineReducers({ jsonforms: jsonformsReducer() });

const departmentTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('department')
);

export const initialState: any = {
  jsonforms: {
    renderers: [
      ...angularMaterialRenderers,
      { tester: rankWith(5, departmentTester), renderer: CustomAutocompleteControlRenderer }
    ],
    fields: [],
  }
};
