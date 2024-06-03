import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface CustomEvent {
  name: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class Eventer {
  private eventSubjects: Map<string, Subject<CustomEvent>> = new Map();

  /**
   * Subscribes to a custom event.
   * @param eventName The name of the event.
   * @param callback The callback function to be called when the event is triggered.
   */
  on(eventName: string, callback: (event: CustomEvent) => void): void {
    if (!this.eventSubjects.has(eventName)) {
      this.eventSubjects.set(eventName, new Subject<CustomEvent>());
    }

    const eventSubject = this.eventSubjects.get(eventName);
    eventSubject?.subscribe(callback);
  }

  /**
   * Un-subscribes from multiple custom events.
   * @param eventNames The names of the events to un-subscribe from.
   */
  off(...eventNames: string[]): void {
    eventNames.forEach(eventName => {
      const eventSubject = this.eventSubjects.get(eventName);
      if (eventSubject) {
        eventSubject.unsubscribe();
        this.eventSubjects.delete(eventName);
      }
    });
  }

  /**
   * Triggers a custom event along with a CustomEvent object.
   * @param eventName The name of the event.
   * @param customEvent The CustomEvent object containing the name and data to be sent with the event.
   */
  trigger(customEvent: CustomEvent): void {
    const eventSubject = this.eventSubjects.get(customEvent.name);
    if (eventSubject) {
      eventSubject.next(customEvent);
    }
  }
}
