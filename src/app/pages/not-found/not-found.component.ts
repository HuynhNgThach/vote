import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastService } from '@share/services/toast/toast.service';


export enum EToastType {
    error = 'error',
    warning = 'warning',
    success = 'success'
}
export interface IToastNotification {
    message: string,
    type: EToastType
}
@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
    constructor(private toastService: ToastService) { }
    test() {
        this.toastService.toast({
            message: 'Show toast info',
            type: EToastType.warning
        })
    }
}
