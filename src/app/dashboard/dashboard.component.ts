import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  showDialog = false

  voteForm = new FormGroup({
    topic: new FormControl(''),
    options: new FormArray([new FormControl(''), new FormControl('')])
  })
  get options() {
    return this.voteForm.get('options') as FormArray
  }
  removeItem(index: number) {
    this.options.removeAt(index)
  }
  addOption() {
    this.options.push(new FormControl(''))
  }

  toggleDialog() {
    this.showDialog = !this.showDialog
  }
  handleCreateVote() {
    console.log("submit vote with data", this.voteForm.value)
  }
}
