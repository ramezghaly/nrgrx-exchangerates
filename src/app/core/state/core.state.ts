import * as fromRouter from '@ngrx/router-store';
export interface CoreState{    
    ui: UI
}

export interface UI{
    error:string;
    loaderRequests:number;
}


export const initialCoreState: CoreState = {
    ui: {
        error: '',
        loaderRequests:0
    },
}

