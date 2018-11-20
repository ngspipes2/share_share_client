import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-operation-element',
    templateUrl: './operation-element.component.html',
    styleUrls: ['./operation-element.component.scss']
})
export class OperationElementComponent {

    @Input()
    working : boolean
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";



    constructor() { }

}
