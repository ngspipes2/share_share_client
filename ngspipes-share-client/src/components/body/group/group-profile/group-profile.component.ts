import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-group-profile',
    templateUrl: './group-profile.component.html',
    styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent {

    @Input()
    groupName : string;
    @Input()
    editable : boolean;



    constructor() { }

}
