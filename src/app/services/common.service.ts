import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    updateWheelValues: Subject<{}> = new Subject();
    groupDeleted:Subject<number> = new Subject();
    constructor() { }
}