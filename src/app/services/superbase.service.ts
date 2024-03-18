import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from '@supabase/supabase-js'
import { environment } from '../../../src/environments/environment'
import { Router } from '@angular/router'

export interface IProfile {
    id?: string
    username: string
    website: string
    avatar_url: string
}
export interface IUserCredential {
    email: string,
    password: string
}

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabase: SupabaseClient
    _session: AuthSession | null = null

    constructor(private router: Router) {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session
        })
        return this._session
    }

    profile(user: User) {
        return this.supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.id)
            .single()
    }

    authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback)
    }

    signIn(email: string) {
        return this.supabase.auth.signInWithOtp({ email })
    }

    signOut() {
        return this.supabase.auth.signOut()
    }

    updateProfile(profile: IProfile) {
        const update = {
            ...profile,
            updated_at: new Date(),
        }

        return this.supabase.from('profiles').upsert(update)
    }

    downLoadImage(path: string) {
        return this.supabase.storage.from('avatars').download(path)
    }

    uploadAvatar(filePath: string, file: File) {
        return this.supabase.storage.from('avatars').upload(filePath, file)
    }
    async signUpNewUser(userCredential: IUserCredential) {
        const { data, error } = await this.supabase.auth.signUp({
            ...userCredential,
            options: {
                emailRedirectTo: 'https://localhost:4200/signin'
            }
        })
        if (error) {
            throw error
        }
    }
    async signInUser(userCredential: IUserCredential) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: userCredential.email,
            password: userCredential.password
        })
        if (error) {
            throw error
        }
    }
    async isAuthenticated() {
        return !!(await this.supabase.auth.getSession()).data.session
    }
}