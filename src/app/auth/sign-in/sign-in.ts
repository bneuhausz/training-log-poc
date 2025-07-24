import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { Auth } from "src/app/shared/auth/auth";

@Component({
  selector: 'app-sign-in',
  imports: [IonContent, IonButton, ReactiveFormsModule, IonItem, IonLabel, IonInput, RouterLink
  ],
  template: `
    <ion-content class="ion-padding">
      <form [formGroup]="fg" (ngSubmit)="auth.signIn(fg.value.email!, fg.value.password!)">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="text" formControlName="email" />
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input type="password" formControlName="password" />
        </ion-item>
        <ion-button
          expand="full"
          type="submit"
          [disabled]="!fg.valid"
        >
          Sign In
        </ion-button>
      </form>

      <p class="ion-text-center">
        <a [routerLink]="['/sign-up']">Don't have an account yet? Sign Up</a>
      </p>
    </ion-content>
  `,
})
export default class SignIn {
  protected readonly auth = inject(Auth);
  private readonly fb = inject(FormBuilder);

  fg = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });
}