import { Component, Input } from '@angular/core';

import { RepositoryConfig } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    @Input()
    config : RepositoryConfig;

    @Input()
    selected : boolean;

    deleting : boolean;



    constructor(private dialogManager : DialogManager,
                private repositoryConfigService : RepositoryConfigService) { }



    deleteClick(event : any) {
        let title = "Delete Repository Config";
        let message = "Are you sure you want delete Repository Cofig: " + this.config.name + " ?";
        let options = ["Yes", "No"];
        this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe((response) => {
            if(response === "Yes")
                this.delete();
        });

        event.stopPropagation();
    }

    delete() {
        this.deleting = true;

        this.repositoryConfigService.deleteConfig(this.config.name)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not deleted!", "Repository Config could not be deleted! Please try again latter.");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Repository Config!", error);
            console.error(error);
        });
    }

}
