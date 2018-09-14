import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tools-repository-groups-with-access',
  templateUrl: './tools-repository-groups-with-access.component.html',
  styleUrls: ['./tools-repository-groups-with-access.component.scss']
})
export class ToolsRepositoryGroupsWithAccessComponent {

    @Input()
    groups : string[];

    @Input()
    editable : boolean;



    constructor() { }

}
