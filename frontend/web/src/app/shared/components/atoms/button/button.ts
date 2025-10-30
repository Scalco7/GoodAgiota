import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  standalone: true,
  selector: 'ga-button',
  imports: [ButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

}
