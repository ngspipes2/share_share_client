import { Component, Input, OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { LoadElementComponent } from '../load-element/load-element.component';

@Component({
    selector: 'app-event-load-element',
    templateUrl: './event-load-element.component.html',
    styleUrls: ['./event-load-element.component.scss']
})
export class EventLoadElementComponent implements OnInit, OnChanges, OnDestroy {

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

    ngOnChanges() {
        if(this.subscription)
            this.subscription.unsubscribe();
            
        this.subscription = this.event.subscribe(() => this.loaderComponent.load());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
