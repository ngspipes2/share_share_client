import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-repository-profile',
    templateUrl: './repository-profile.component.html',
    styleUrls: ['./repository-profile.component.scss']
})
export class RepositoryProfileComponent {

    @Input()
    repositoryName : string;
    @Input()
    editable : boolean;



    constructor() {}

}
