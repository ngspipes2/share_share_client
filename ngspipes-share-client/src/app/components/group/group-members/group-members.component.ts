import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-group-members',
    templateUrl: './group-members.component.html',
    styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent {

    @Input()
    members : string[];

    @Input()
    editable : boolean;



    constructor() { }

}
