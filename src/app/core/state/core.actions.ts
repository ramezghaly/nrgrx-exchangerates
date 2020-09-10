import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const showLoader = createAction(
    '[App] Show Loader'
);

export const hideLoader = createAction(
    '[App] Hide Loader'
);

export const navigate = createAction(
    '[Navigation] Navigate',
    props<{urlFragments:string[], extras: NavigationExtras}>()
);

export const showError = createAction(
    '[Error] Show Error',
    props<{ error: string}>()
);

