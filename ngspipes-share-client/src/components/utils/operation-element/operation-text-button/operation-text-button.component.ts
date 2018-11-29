import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operation-text-button',
  templateUrl: './operation-text-button.component.html',
  styleUrls: ['./operation-text-button.component.scss']
})
export class OperationTextButtonComponent {

    @Input()
    action : () => Promise<any>;
    @Input()
    label : string;
    @Input()
    color : string;
    @Input()
    accentColor : string;

    working : boolean;



    constructor() { }



    clicked() {
        this.working = true;

        this.action()
        .then(() => this.working = false)
        .catch(() => this.working = false);
    }

}
