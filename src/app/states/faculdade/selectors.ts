import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FaculdadeState, faculdadeFeatureKey } from './reducers';

export const faculdadeState = createFeatureSelector<FaculdadeState>(
  faculdadeFeatureKey,
);

export const selectFaculdade = createSelector(
  faculdadeState,
  (c) => c.faculdade,
);

export const selectIdFirebaseFaculdade = createSelector(
  faculdadeState,
  (c) => c.idFirebase,
);
