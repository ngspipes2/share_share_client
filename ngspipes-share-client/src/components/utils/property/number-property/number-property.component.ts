import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-number-property',
    templateUrl: './number-property.component.html',
    styleUrls: ['./number-property.component.scss']
})
export class NumberPropertyComponent {

    @Input()
    name : string;
    @Input()
    value : number;
    @Input()
    editable : boolean;

    @Output()
    valueChange : EventEmitter<number> = new EventEmitter<number>();



    constructor() { }



    valueChanged() {
        this.valueChange.emit(this.value);
    }

}
