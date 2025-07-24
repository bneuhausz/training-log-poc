import { computed, inject, Injectable, signal } from "@angular/core";
import { Supabase } from "../supabase/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter, take } from "rxjs";
import { Router } from "@angular/router";

type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: AuthError | null;
};

//TODO refactor to use observables
@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly supabase = inject(Supabase).client;
  private readonly router = inject(Router);

  readonly #state = signal<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null
  });

  readonly user = computed(() => this.#state().user);
  readonly isAuthenticated = computed(() => !!this.#state().session);

  readonly firstLoad$ = toObservable(this.#state).pipe(
    filter(state => !state.isLoading),
    take(1)
  );

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.#state.update(state => ({
        ...state,
        session,
        user: session?.user ?? null,
        isLoading: false,
        error: null
      }));
    });
  }

  async signUp(email: string, password: string) {
    this.setLoading(true);
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    this.setLoading(false);
    console.log('Sign Up Data:', data);

    if (error) {
      this.setError(error);
    }
    else {
      //TODO: confirmation sent
    }
  }

  async signIn(email: string, password: string) {
    this.setLoading(true);
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.setError(error);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  async signOut() {
    this.setLoading(true);
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      this.setError(error);
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }

  private setError(error: AuthError | null) {
    this.#state.update(state => ({ ...state, error }));
  }

  private setLoading(isLoading: boolean) {
    this.#state.update(state => ({ ...state, isLoading }));
  }
}
