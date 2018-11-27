import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-group-item',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent {

    @Input()
    groupName : string;



    constructor() { }

}
