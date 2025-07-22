import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Auth } from "src/app/shared/auth/auth";

@Component({
  selector: 'app-sign-up',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButtons,
    IonBackButton],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/" />
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form [formGroup]="fg" (ngSubmit)="auth.signUp(fg.value.email!, fg.value.password!)">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="text" formControlName="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input type="password" formControlName="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Confirm Password</ion-label>
          <ion-input type="password" formControlName="confirmPassword"></ion-input>
        </ion-item>
        <ion-button
          color="dark"
          expand="full"
          type="submit"
          [disabled]="!fg.valid"
        >
          Sign Up
        </ion-button>
      </form>
    </ion-content>
  `,
})
export default class SignUp {
  protected readonly auth = inject(Auth);
  private readonly fb = inject(FormBuilder);

  //TODO add confirm password validation
  fg = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required]),
    confirmPassword: this.fb.nonNullable.control('', [Validators.required]),
  });
}