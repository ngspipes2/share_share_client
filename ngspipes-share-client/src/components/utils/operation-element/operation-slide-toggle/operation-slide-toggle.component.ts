import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-operation-slide-toggle',
    templateUrl: './operation-slide-toggle.component.html',
    styleUrls: ['./operation-slide-toggle.component.scss']
})
export class OperationSlideToggleComponent {

    @Input()
    action : (event : any) => Promise<any>;
    @Input()
    color : string;
    @Input()
    disabled : boolean;
    @Input()
    value : boolean;

    @Output()
    valueChange : EventEmitter<boolean> = new EventEmitter<boolean>();

    working : boolean;



    constructor() { }



    clicked(event : any) {
        if(this.disabled)
            return;
       
        this.value = !this.value;
        this.valueChange.emit(this.value);

        this.working = true;

        this.action(event)
        .then(() => this.working = false)
        .catch(() => this.working = false);
    }

}
