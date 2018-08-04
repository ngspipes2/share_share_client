import { Component, Input } from '@angular/core';

import { ToolsRepository } from '../../../logic/domain/tools-repository';

@Component({
    selector: 'app-user-tools-repositories',
    templateUrl: './user-tools-repositories.component.html',
    styleUrls: ['./user-tools-repositories.component.scss']
})
export class UserToolsRepositoriesComponent {

    @Input()
    repositories : ToolsRepository[];

    @Input()
    editable : boolean;



    constructor() { }

}
