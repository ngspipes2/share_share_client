import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

    @Input("headerTitle")
    title : string;
    @Input()
    color : string = "primary";
    @Input()
    icon : string;
    @Input()
    svgIcon : string;



    constructor() { }

}
