import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.scss']
})
export class PropertyComponent {

    @ContentChild("nameTemplate")
    nameTemplateRef: TemplateRef<any>;
    @ContentChild("valueTemplate")
    valueTemplateRef: TemplateRef<any>;

    @Input()
    name : string;
    @Input()
    value : any;



    constructor() { }

}
