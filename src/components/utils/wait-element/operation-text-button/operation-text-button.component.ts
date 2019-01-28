import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operation-text-button',
  templateUrl: './operation-text-button.component.html',
  styleUrls: ['./operation-text-button.component.scss']
})
export class OperationTextButtonComponent {

    @Input()
    action : (event : any) => Promise<any>;
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



    clicked(event : any) {
        this.working = true;

        this.action(event)
        .then(() => this.working = false)
        .catch(() => this.working = false);
    }

}
