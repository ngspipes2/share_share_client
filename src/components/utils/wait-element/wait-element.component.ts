import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wait-element',
  templateUrl: './wait-element.component.html',
  styleUrls: ['./wait-element.component.scss']
})
export class WaitElementComponent {

    @Input()
    waitting : boolean;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";



    constructor() { }

}
