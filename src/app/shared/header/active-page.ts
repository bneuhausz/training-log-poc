import { inject, Injectable, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivePage {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly browserTitleService = inject(Title);

  readonly #title = signal<string>('');
  readonly title = this.#title.asReadonly();

  readonly #showBackButton = signal<boolean>(this.canNavigateBack());
  readonly showBackButton = this.#showBackButton.asReadonly();

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.title)
    ).subscribe((title) => {
      this.handleNavigationEnd(title);
    });
  }

  private handleNavigationEnd(title: string | undefined) {
    this.#title.set(title ?? '');
    this.#showBackButton.set(this.canNavigateBack());
    this.browserTitleService.setTitle(title ?? '');
  }

  private canNavigateBack() {
    return this.router.url !== '/' && this.router.url !== '/sign-in';
  }
}