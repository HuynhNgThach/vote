import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from '@supabase/supabase-js'
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router'
import { Database } from '../../../../types/supabase'

export interface IProfile {
    id?: string
    username: string
    website: string
    avatar_url: string
}

export interface IVote {
    topic?: string,
    owner?: string,
    options?: Array<string | null>
}
export interface IVoteDispl {
    topic?: string,
    // owner?: string,
    options?: Array<{ option_text: string, id: string, votes: Array<string> }>

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
        this.supabase = createClient<Database>(environment.supabaseUrl, environment.supabaseKey)
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

    async signOut() {
        await this.supabase.auth.signOut()
        this.router.navigate(['/auth/signin'])
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
                emailRedirectTo: 'http://localhost:4200/auth/signin'
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
        console.log(error)
        if (error) {
            throw error
        }
    }
    async isAuthenticated() {
        return !!(await this.supabase.auth.getSession()).data.session
    }
    async createNewVote(payload: IVote) {
        try {
            const user = this.session?.user
            console.log("user", user)
            if (!user) {
                return
            }
            const { data: topic, error } = await this.supabase.from('topics').insert({
                topic: payload.topic,
                owner_id: user.id
            }).select('id').single()
            console.log(error)
            if (topic && payload.options) {
                await this.supabase.from('options').insert(
                    payload.options.map(i => ({ topic_id: topic.id, option_text: i }))
                )
            }

        } catch (error) {
            console.log(error)
        }
    }
    async getVotes() {
        try {

            const { data, error } = await this.supabase.from('topics').select(`
                id,
                topic,
                options (
                    option_text,
                    id,
                    votes (
                        user_id
                    )
                )

            `)
            console.log(data, error)


            if (error) {
                return undefined
            }
            return data
        } catch (error) {
            console.log(error)
        }
        return undefined
    }
    subscribeToVotes() {
        this.supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'votes' },
                (payload) => {
                    console.log('Change received!', payload)
                }
            )
            .subscribe()
    }
    async updateVote(optionId: string, userId: string) {
        const { data, error } = await this.supabase.from('votes').insert({
            user_id: userId,
            option_id: optionId
        })
    }
}