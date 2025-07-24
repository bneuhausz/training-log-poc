import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Auth } from '../shared/auth/auth';

@Component({
  selector: 'app-home',
  imports: [IonContent],
  template: `
    <ion-content class="ion-padding">
      Home Page!
    </ion-content>
  `,
})
export default class Home {
  auth = inject(Auth);
}
