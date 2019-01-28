import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-property',
  templateUrl: './link-property.component.html',
  styleUrls: ['./link-property.component.scss']
})
export class LinkPropertyComponent {

    @Input()
    name : string;
    @Input()
    value : string;
    @Input()
    link : string;
    @Input()
    copyButton : boolean;



    constructor() { }

}
