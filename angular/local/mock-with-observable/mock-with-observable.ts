// Angular + Typescript
import "rxjs-compat/add/observable/of";
// @ts-ignore
import {delay, from, Observable} from 'rxjs';

interface Person {
    firstName: string;
    lastName: string;
}
export class MockWithObservableComponent {
    constructor() {
        // you may move this to ngOnInit
        this.mockSomeData().subscribe((persons: Person[]) => {
            console.log(persons);
        });
    }
    // move this to a service
    mockSomeData(): Observable<Person[]> {
        return from([{firstName:'Zágoni', lastName: 'Eli'},{firstName:'Bíró', lastName: 'Dani'}]).pipe(delay(1000));
    }
}