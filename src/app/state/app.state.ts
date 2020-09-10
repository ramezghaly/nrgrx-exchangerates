import { CoreState } from "../core/state/core.state";
import * as fromRouter from '@ngrx/router-store';

export interface State {
    core: CoreState;
    router: fromRouter.RouterReducerState<any>;
}