import {Component, OnDestroy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomEvent, Eventer} from "./services/eventer";
import { ToastrService } from 'ngx-toastr';
enum CustomEventNames {A='A', B='B', C='C'}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnDestroy {
  constructor(private eventer:Eventer, private toastr: ToastrService) {
    this.eventer.on(CustomEventNames.A, (evt:CustomEvent) => this.toastr.success(evt.data));
    this.eventer.on(CustomEventNames.B, (evt:CustomEvent) => this.toastr.success(evt.data));
    this.eventer.on(CustomEventNames.C, (evt:CustomEvent) => this.toastr.success(evt.data));
  }

  ngOnDestroy(): void {
    this.eventer.off(CustomEventNames.A);
  }
  triggerAlma() {
    this.eventer.trigger({name:CustomEventNames.A, data:"alma"});
  }
  triggerKorte() {
    this.eventer.trigger({name:CustomEventNames.B, data:"körte"});
  }
  triggerSzilva() {
    this.eventer.trigger({name:CustomEventNames.C, data:"szilva"});
  }
}
