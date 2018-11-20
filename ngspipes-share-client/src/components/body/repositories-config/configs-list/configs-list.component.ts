import { Component, Output, EventEmitter } from '@angular/core';

import { RepositoryConfig } from '../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../services/repository-config.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-configs-list',
    templateUrl: './configs-list.component.html',
    styleUrls: ['./configs-list.component.scss']
})
export class ConfigsListComponent {

    @Output()
    selectedConfigNameChange : EventEmitter<string> = new EventEmitter<string>();

    selectedConfigName : string;

    creating : boolean;



    constructor(private repositoryConfigService: RepositoryConfigService,
                private dialogManager : DialogManager) { }



    createConfigClick() {
        this.dialogManager.openNewRepositoryConfigNameDialog().afterClosed().subscribe(name => {
            if(!name)
                return;

            this.createConfig(name);
        });
    }

    createConfig(name : string) {
        let config = new RepositoryConfig(name, "", "", []);

        this.creating = true;

        this.repositoryConfigService.createConfig(config)
        .then(result => {
            this.creating = false;

            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not created!", "Repository Config could not be created! Please try again latter.");
            else
                this.selectConfig(config.name);
        })
        .catch(error => {
            this.creating = false;
            this.dialogManager.openErrorDialog("Error creating Repository Config!", error);
            console.error(error);
        });
    }

    selectConfig(name : string) {
        this.selectedConfigName = name;
        this.selectedConfigNameChange.emit(name);
    }

}
