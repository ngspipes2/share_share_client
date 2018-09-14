import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pipelines-repository-groups-with-access',
  templateUrl: './pipelines-repository-groups-with-access.component.html',
  styleUrls: ['./pipelines-repository-groups-with-access.component.scss']
})
export class PipelinesRepositoryGroupsWithAccessComponent {

    @Input()
    groups : string[];

    @Input()
    editable : boolean;



    constructor() { }

}
