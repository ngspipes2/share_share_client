import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-entities-frame',
    templateUrl: './entities-frame.component.html',
    styleUrls: ['./entities-frame.component.scss']
})
export class EntitiesFrameComponent {

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
