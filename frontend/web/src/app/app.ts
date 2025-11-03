import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { Toast } from 'primeng/toast';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private primeng: PrimeNG) { }

  protected readonly title = signal('web');

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
