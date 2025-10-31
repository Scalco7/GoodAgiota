import { Component, Input, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ga-side-bar-route',
  imports: [],
  templateUrl: './side-bar-route.html',
  styleUrl: './side-bar-route.scss',
})
export class SideBarRouteComponent {
  @Input() name!: string;
  @Input() icon!: string;
  @Input() path!: string;

  public onClick() {
    console.log(this.path);
  }
}
