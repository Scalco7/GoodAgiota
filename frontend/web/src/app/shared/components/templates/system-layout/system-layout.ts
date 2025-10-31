import { Component } from '@angular/core';
import { SideBarComponent } from "../../molecules/side-bar/side-bar";
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ga-system-layout',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './system-layout.html',
  styleUrl: './system-layout.scss',
})
export class SystemLayoutTemplate {

}
