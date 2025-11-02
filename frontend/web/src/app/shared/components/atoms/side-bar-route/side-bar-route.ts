import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'ga-side-bar-route',
  imports: [CommonModule],
  templateUrl: './side-bar-route.html',
  styleUrl: './side-bar-route.scss',
})
export class SideBarRouteComponent {
  private router = inject(Router);

  @Input() name!: string;
  @Input() icon!: string;
  @Input() path!: string;
  @Input() selected!: boolean;

  public onClick() {
    this.router.navigate([this.path]);
  }
}
