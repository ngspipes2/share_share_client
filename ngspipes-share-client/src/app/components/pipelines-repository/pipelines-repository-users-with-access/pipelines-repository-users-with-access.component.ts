import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pipelines-repository-users-with-access',
  templateUrl: './pipelines-repository-users-with-access.component.html',
  styleUrls: ['./pipelines-repository-users-with-access.component.scss']
})
export class PipelinesRepositoryUsersWithAccessComponent {

    @Input()
    users : string[];

    @Input()
    editable : boolean;



    constructor() { }

}
