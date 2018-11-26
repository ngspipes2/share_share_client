import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-string-property',
    templateUrl: './string-property.component.html',
    styleUrls: ['./string-property.component.scss']
})
export class StringPropertyComponent {

    @Input()
    name : string;
    @Input()
    value : string;
    @Input()
    editable : boolean;
    @Input()
    multipleLines : boolean;


    @Output()
    valueChange : EventEmitter<string> = new EventEmitter<string>();



    constructor() { }



    valueChanged() {
        this.valueChange.emit(this.value);
    }

}
