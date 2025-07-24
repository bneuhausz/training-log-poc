import { Component, inject } from "@angular/core";
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonBackButton } from '@ionic/angular/standalone';
import { Auth } from "../auth/auth";
import { ActivePage } from "./active-page";

@Component({
  selector: 'app-header',
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonBackButton],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        @if (activePage.showBackButton()) {
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
        }
        
        <ion-title>{{ activePage.title() }}</ion-title>

        @if (auth.isAuthenticated()) {
          <ion-buttons slot="end">
            <ion-icon name="log-out-outline" size="large" (click)="auth.signOut()" />
          </ion-buttons>
        }
      </ion-toolbar>
    </ion-header>
  `
})
export class Header {
  auth = inject(Auth);
  activePage = inject(ActivePage);
}