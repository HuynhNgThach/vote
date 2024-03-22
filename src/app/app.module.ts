import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '@share/components/toast/toast.component';
import { AppComponent } from './app.component';
@NgModule({
    imports: [
        ReactiveFormsModule,
        ToastComponent,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]

})
export class AppModule { }