import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-repository-item',
    templateUrl: './repository-item.component.html',
    styleUrls: ['./repository-item.component.scss']
})
export class RepositoryItemComponent {

    @Input()
    repositoryName : string;



    constructor() { }

}
