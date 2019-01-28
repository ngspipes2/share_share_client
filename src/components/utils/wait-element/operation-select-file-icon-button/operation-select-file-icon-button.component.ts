import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-operation-select-file-icon-button',
    templateUrl: './operation-select-file-icon-button.component.html',
    styleUrls: ['./operation-select-file-icon-button.component.scss']
})
export class OperationSelectFileIconButtonComponent {


    @Input()
    action : (file : any, event : any) => Promise<any>;
    @Input()
    icon : string;
    @Input()
    svgIcon : string;
    @Input()
    color : string;
    @Input()
    accentColor : string;
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
