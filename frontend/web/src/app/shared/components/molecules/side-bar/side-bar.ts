import { Component, inject, OnInit } from '@angular/core';
import { SideBarRouteComponent } from "../../atoms/side-bar-route/side-bar-route";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface IRoute {
  icon: string,
  name: string
  path: string
}

@Component({
  standalone: true,
  selector: 'ga-side-bar',
  imports: [SideBarRouteComponent],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBarComponent implements OnInit {
  private router = inject(Router);

  public routes: IRoute[] = [
    // {
    //   name: 'Dashboard',
    //   path: '/',
    //   icon: 'pi-chart-pie'
    // },
    {
      name: 'Empréstimos',
      path: '/loans',
      icon: 'pi-wallet'
    },
    {
      name: 'Usuários',
      path: '/users',
      icon: 'pi-users'
    },
  ]

  private routerSubscription!: Subscription;
  public activeRoute!: string;

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects;
      });

    this.activeRoute = this.router.url;
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
