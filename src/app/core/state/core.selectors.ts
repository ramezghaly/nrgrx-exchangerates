import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.state';


const getCoreFeatureState = createFeatureSelector<CoreState>('core');

export const getLoader = createSelector(
    getCoreFeatureState,
    state => state.ui.loaderRequests > 0
);

export const getError = createSelector(
    getCoreFeatureState,
    state => state.ui.error
);

