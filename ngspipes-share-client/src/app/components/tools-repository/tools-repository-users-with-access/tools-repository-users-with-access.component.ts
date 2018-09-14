import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tools-repository-users-with-access',
  templateUrl: './tools-repository-users-with-access.component.html',
  styleUrls: ['./tools-repository-users-with-access.component.scss']
})
export class ToolsRepositoryUsersWithAccessComponent {

    @Input()
    users : string[];

    @Input()
    editable : boolean;



    constructor() { }

}
