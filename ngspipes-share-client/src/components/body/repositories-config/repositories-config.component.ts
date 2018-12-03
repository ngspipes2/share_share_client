import { Component } from '@angular/core';

@Component({
    selector: 'app-repositories-config',
    templateUrl: './repositories-config.component.html',
    styleUrls: ['./repositories-config.component.scss']
})
export class RepositoriesConfigComponent {

    selectedConfigRepositoryName : string;



    constructor() { }



    selectConfig(selectedConfigRepositoryName : string) {
        this.selectedConfigRepositoryName = selectedConfigRepositoryName;
    }

}
