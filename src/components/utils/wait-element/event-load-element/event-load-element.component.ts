import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { LoadElementComponent } from '../load-element/load-element.component';

@Component({
    selector: 'app-event-load-element',
    templateUrl: './event-load-element.component.html',
    styleUrls: ['./event-load-element.component.scss']
})
export class EventLoadElementComponent implements OnInit, OnDestroy {

    @ViewChild("loaderComponent")
    loaderComponent : LoadElementComponent;

    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    loader : () => Promise<any>;
    @Input()
    event : Subject<any>;

    subscription : any;



    constructor() { }



    ngOnInit() {
        this.subscription = this.event.subscribe(() => this.loaderComponent.load());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
