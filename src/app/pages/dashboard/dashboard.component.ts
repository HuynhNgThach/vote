import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IVote, IVoteDispl, SupabaseService } from '@share/services';
import { VoteCardComponent } from '@share/components';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, VoteCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  showDialog = false

  voteForm = new FormGroup({
    topic: new FormControl(''),
    options: new FormArray([new FormControl(''), new FormControl('')])
  })
  votes: Array<IVoteDispl> | undefined = undefined
  loading = false

  get options() {
    return this.voteForm.get('options') as FormArray
  }
  constructor(private supabase: SupabaseService) {
  }
  async ngOnInit(): Promise<void> {
    console.log("from init", await this.supabase.getVotes())
    this.votes = await this.supabase.getVotes() as unknown as Array<IVoteDispl>
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
  async handleCreateVote() {
    try {
      this.loading = true
      const payload: IVote = {
        topic: this.voteForm.value.topic!,
        options: this.voteForm.value.options!
      }
      await this.supabase.createNewVote(payload)
      this.votes = await this.supabase.getVotes() as unknown as Array<IVoteDispl>

    } finally {
      this.loading = false

      this.toggleDialog()
    }

  }
  handleSignout() {
    this.supabase.signOut()
  }
}
