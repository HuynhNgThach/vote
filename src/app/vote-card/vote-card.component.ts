import { Component, Input, signal } from '@angular/core';
import { IVoteDispl } from '../services/superbase.service';

@Component({
  selector: 'app-vote-card',
  standalone: true,
  imports: [],
  templateUrl: './vote-card.component.html',
})
export class VoteCardComponent {
  @Input()
  vote: IVoteDispl | undefined

  get options() {
    return this.vote?.options ?? []
  }
  get totalVote() {

    return this.options.reduce((total, curr) => {
      const currVote = curr.voteCount ? 0 : curr.voteCount
      return currVote + total
    }, 0)
  }

  updateVote(index: number) {
    if (!this.options[index]) {
      return
    }
    if (!this.options[index].voteCount && this.options[index].voteCount !== 0) {
      this.options[index].voteCount = 0
      return
    }
    this.options[index].voteCount!++
  }
}
