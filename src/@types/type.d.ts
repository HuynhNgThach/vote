declare namespace Types {
    export enum EToastType {
        error = 'error',
        warning = 'warning',
        success = 'success'
    }
    export interface IToastNotification {
        message: string,
        type: EToastType
    }
}