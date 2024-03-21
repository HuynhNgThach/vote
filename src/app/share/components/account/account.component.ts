import { Component, Input, OnInit } from '@angular/core';
import { IProfile, SupabaseService } from '../../services/supabase/superbase.service';
import { AuthSession } from '@supabase/supabase-js';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  loading = false
  profile!: IProfile


  @Input()
  session!: AuthSession

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: ''
  })

  constructor(
    private readonly superbase: SupabaseService,
    private formBuilder: FormBuilder
  ) { }


  async ngOnInit(): Promise<void> {
    await this.getProfile()
    const { username, website, avatar_url } = this.profile
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url
    })
  }

  async getProfile() {
    try {
      this.loading = true
      console.log("get profile", this.session)
      const { user } = this.session
      const { data: profile, error, status } = await this.superbase.profile(user)
      if (error && status !== 406) {
        throw error
      }
      if (profile) {
        this.profile = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`getProfile ${error.message}`)
      }
    } finally {
      this.loading = false
    }
  }
  async updateProfile(): Promise<void> {
    try {
      this.loading = true

      const { user } = this.session

      const username = this.updateProfileForm.value.username as string
      const website = this.updateProfileForm.value.website as string
      const avatar_url = this.updateProfileForm.value.avatar_url as string

      const { error } = await this.superbase.updateProfile({
        id: user.id,
        username,
        website,
        avatar_url
      })
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`updateProfile ${error.message}`)
      }
    } finally {
      this.loading = false
    }
  }

  async signOut() {
    await this.superbase.signOut()
  }

}
