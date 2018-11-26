import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-boolean-property',
    templateUrl: './boolean-property.component.html',
    styleUrls: ['./boolean-property.component.scss']
})
export class BooleanPropertyComponent {

    @Input()
    name : string;
    @Input()
    value : boolean;
    @Input()
    editable : boolean;

    @Output()
    valueChange : EventEmitter<boolean> = new EventEmitter<boolean>();



    constructor() { }



    valueChanged() {
        this.valueChange.emit(this.value);
    }

}
