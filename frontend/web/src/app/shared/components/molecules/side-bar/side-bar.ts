import { Component } from '@angular/core';
import { SideBarRouteComponent } from "../../atoms/side-bar-route/side-bar-route";

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
export class SideBarComponent {
  public routes: IRoute[] = [
    {
      name: 'Dashboard',
      path: '/',
      icon: 'pi-chart-pie'
    },
    {
      name: 'Empréstimos',
      path: '/loans',
      icon: 'pi-wallet'
    },
    {
      name: 'Users',
      path: '/users',
      icon: 'pi-users'
    },
  ]
}
