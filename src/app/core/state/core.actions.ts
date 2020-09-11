import { createAction, props } from '@ngrx/store';

export const showLoader = createAction(
    '[App] Show Loader'
);

export const hideLoader = createAction(
    '[App] Hide Loader'
);


export const showError = createAction(
    '[Error] Show Error',
    props<{ error: string}>()
);

