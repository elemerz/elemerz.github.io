import { Component, Input } from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-count-down-latch',
  standalone: true,
  templateUrl: './count-down-latch.component.html',
  styleUrls: ['./count-down-latch.component.less'],
  imports: [
    NgStyle
  ]
})
export class CountDownLatchComponent {
  @Input() duration: number = 5; // Default duration of 5 seconds
  @Input() fillColor: string = 'green'; // Default fill color
  @Input() backgroundColor: string = '#ccc'; // Default background color

  degrees: string = '0deg';
}
