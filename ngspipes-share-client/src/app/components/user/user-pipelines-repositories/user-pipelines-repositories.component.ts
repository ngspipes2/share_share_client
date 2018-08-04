import { Component, Input } from '@angular/core';

import { PipelinesRepository } from '../../../logic/domain/pipelines-repository';

@Component({
    selector: 'app-user-pipelines-repositories',
    templateUrl: './user-pipelines-repositories.component.html',
    styleUrls: ['./user-pipelines-repositories.component.scss']
})
export class UserPipelinesRepositoriesComponent {

    @Input()
    repositories : PipelinesRepository[];

    @Input()
    editable : boolean;



    constructor() { }

}
