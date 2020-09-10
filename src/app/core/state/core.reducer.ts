import { createReducer, on } from '@ngrx/store';
import * as State from './core.state';
import * as Actions from './core.actions';

export const coreReducer = createReducer<State.CoreState>(
    State.initialCoreState,
    on(Actions.showLoader,
        (state: State.CoreState, action): State.CoreState => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    loaderRequests: state.ui.loaderRequests + 1
                }
            };
        }),
    on(Actions.hideLoader,
        (state: State.CoreState, action): State.CoreState => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    loaderRequests: state.ui.loaderRequests - 1
                }
            };
        }),
    on(Actions.showError,
        (state: State.CoreState, action): State.CoreState => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: action.error
                }
            };
        })
);