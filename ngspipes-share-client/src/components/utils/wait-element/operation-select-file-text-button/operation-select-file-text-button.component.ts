import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-operation-select-file-text-button',
    templateUrl: './operation-select-file-text-button.component.html',
    styleUrls: ['./operation-select-file-text-button.component.scss']
})
export class OperationSelectFileTextButtonComponent {

    @Input()
    action : (file : any, event : any) => Promise<any>;
    @Input()
    label : string;
    @Input()
    color : string;
    @Input()
    accentColor : string;
    @Input()
    raised : boolean;
    @Input()
    spinnerDiameter : number = 25;
    @Input()
    spinnerColor : string = "accent";

    working : boolean;



    constructor() { }



    clicked(file : any, event : any) {
        this.working = true;

        this.action(file, event)
        .then(() => this.working = false)
        .catch(() => this.working = false);
    }

}
