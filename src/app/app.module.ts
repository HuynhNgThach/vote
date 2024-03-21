import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '@share/components/toast/toast.component';
@NgModule({
    imports: [
        ReactiveFormsModule,
        ToastComponent
    ],
    // declarations: [ToastComponent],
    // exports: [ToastComponent],
})
export class AppModule { }