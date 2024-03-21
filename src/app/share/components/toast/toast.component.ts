import { Component, OnInit, Type } from '@angular/core';
import { ToastService } from '@share/services/toast/toast.service';
import { debounceTime, tap } from 'rxjs';
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
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',

})

export class ToastComponent implements OnInit {
  showToast: boolean = false
  toast: IToastNotification = {
    message: '',
    type: EToastType.success
  }
  constructor(private serviceToast: ToastService) { }
  ngOnInit(): void {
    this.serviceToast.toastRequest$
      .pipe(
        tap((toast: IToastNotification) => {
          this.toast = toast;
          this.showToast = true;
        }),
        debounceTime(3000),
        tap(() => {
          this.showToast = false;
        })
      )
      .subscribe();
  }
}
