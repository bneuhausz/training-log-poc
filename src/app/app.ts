import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { Header } from "./shared/header/header";

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, Header, IonContent],
  template: `
    <ion-app>
      <app-header />
      <ion-content class="ion-padding">
        <ion-router-outlet />
      </ion-content>
    </ion-app>
  `,
})
export class App { }
