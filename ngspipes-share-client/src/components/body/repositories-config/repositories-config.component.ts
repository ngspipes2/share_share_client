import { Component } from '@angular/core';

@Component({
    selector: 'app-repositories-config',
    templateUrl: './repositories-config.component.html',
    styleUrls: ['./repositories-config.component.scss']
})
export class RepositoriesConfigComponent {

    selectedConfigName : string;



    constructor() { }



    selectConfig(selectedConfigName : string) {
        this.selectedConfigName = selectedConfigName;
    }

}
