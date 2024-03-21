import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
export enum EToastType {
  error = 'error',
  warning = 'warning',
  success = 'success'
}
export interface IToastNotification {
  message: string,
  type: EToastType
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastRequest = new ReplaySubject<IToastNotification>

  toastRequest$ = this.toastRequest.asObservable()

  constructor() { }

  toast(toast: IToastNotification) {
    console.log("on toast", toast, this.toastRequest$)
    this.toastRequest.next(toast)
  }
}
