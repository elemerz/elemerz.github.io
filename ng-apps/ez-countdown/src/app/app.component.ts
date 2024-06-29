import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CountDownLatchComponent} from "./count-down-latch/count-down-latch.component";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountDownLatchComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  showCountDown: boolean = false;

  startStopCountdown() {
    this.showCountDown = ! this.showCountDown;
  }
}
