import { Component, Input, signal } from '@angular/core';
import { IVoteDispl, SupabaseService } from '../../services/supabase/superbase.service';

@Component({
  selector: 'app-vote-card',
  standalone: true,
  imports: [],
  templateUrl: './vote-card.component.html',
})
export class VoteCardComponent {
  @Input()
  vote: IVoteDispl | undefined
  constructor(private supabase: SupabaseService) {
    this.supabase.subscribeToVotes()
  }

  get options() {
    return this.vote?.options ?? []
  }
  get totalVotes() {
    let totals: Array<string> = []
    for (const option of this.options) {
      totals = [...totals, ...option.votes]
    }
    return totals.length
  }
  addVote(optionIndex: number) {
    this.supabase.updateVote(this.options[optionIndex].id, this.supabase.session?.user.id ?? '')
    this.options[optionIndex].votes.push(Date.now().toString())
  }
  percentage(value: number) {
    return `${value * 100 / this.totalVotes}%`
  }


}
