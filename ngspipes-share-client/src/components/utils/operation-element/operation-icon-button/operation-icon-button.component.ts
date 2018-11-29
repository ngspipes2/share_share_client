import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operation-icon-button',
  templateUrl: './operation-icon-button.component.html',
  styleUrls: ['./operation-icon-button.component.scss']
})
export class OperationIconButtonComponent {

    @Input()
    action : () => Promise<any>;
    @Input()
    icon : string;
    @Input()
    svgIcon : string;
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
