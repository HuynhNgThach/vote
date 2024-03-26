import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CardComponent } from '@share/components';
import { InputComponent } from '@share/components/input/input.component';
import { NgIf } from '@angular/common';
import { delay } from '@share/utils';
import { IVoteDispl } from '@share/services/supabase/superbase.service';

@Component({
  selector: 'app-form-management',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, InputComponent, NgIf],
  templateUrl: './form-management.component.html',
})
export class FormManagementComponent {
  loading = false
  signinForm = new FormGroup({
    emailFormControl: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
    passwordFromControl: new FormControl('', { validators: [Validators.required, Validators.minLength(8)], updateOn: 'blur' }),
  })


  voteForm = new FormGroup({
    topic: new FormControl('', { validators: [Validators.required, Validators.maxLength(255)], updateOn: 'blur' }),
    options: new FormArray([new FormControl('', { validators: [Validators.required, Validators.maxLength(100)], updateOn: 'blur' }), new FormControl('', { validators: [Validators.required, Validators.maxLength(100)], updateOn: 'blur' })], { validators: [this.atLeastTwoOptions()], updateOn: 'submit' })
  })


  votes: Array<IVoteDispl> | undefined = undefined

  get options() {
    return this.voteForm.get('options') as FormArray
  }


  removeItem(index: number) {
    this.options.removeAt(index)
  }
  addOption() {
    this.voteForm
    this.options.push(new FormControl(''))
  }


  async handleSignin() {
    try {
      this.loading = true
      console.log(this.signinForm.controls.passwordFromControl)
      if (this.signinForm.invalid) {
        console.log("Invalid form")
        return
      }
      await delay(5000)
    } catch (error) {
      console.log("error happened", error)
    } finally {
      this.loading = false
    }
  }
  atLeastTwoOptions(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;


      return { atLeastTwoOptions: true }
    }
  }
}
