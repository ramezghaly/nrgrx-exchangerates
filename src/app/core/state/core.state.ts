import * as fromRouter from '@ngrx/router-store';
export interface CoreState{    
    ui: UiState
}

export interface UiState{
    error:string;
    loaderRequests:number;
}

const initialUiState: UiState = {
    error: '',
    loaderRequests:0
}

export const initialCoreState: CoreState = {
    ui: initialUiState

}

