import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { Auth } from '../shared/auth/auth';

@Component({
  selector: 'app-home',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
        <ion-buttons slot="end">
          <ion-icon name="log-out-outline" size="large" (click)="auth.signOut()" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      Home Page!
    </ion-content>
  `,
})
export default class Home {
  auth = inject(Auth);
}
