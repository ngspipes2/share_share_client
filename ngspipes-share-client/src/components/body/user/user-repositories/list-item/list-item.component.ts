import { Component, Input, OnInit } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';

import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    @Input()
    userName : string;
    @Input()
    repository : Repository;
    @Input()
    editable : boolean;

    isOwner : boolean;
    isMember : boolean;
    isToolsRepository : boolean;
    isPipelinesRepository : boolean;
    deleting : boolean;



    constructor(private repositoryService : RepositoryService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.isOwner = this.repository.ownerName === this.userName;
        this.isMember = this.repository.ownerName !== this.userName;
        this.isToolsRepository = this.repository.entityType === EntityType.TOOLS;
        this.isPipelinesRepository = this.repository.entityType === EntityType.PIPELINES;
    }

    deleteClick() {
        this.dialogManager.openWarningDialog(
            "Delete Repository",
            "Are you sure you want to delete " + this.repository.repositoryName + "?",
            ["Yes", "No"]
        ).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteRepository();
        });
    }

    deleteRepository() {
        this.deleting = true;

        this.repositoryService.deleteRepository(this.repository.repositoryName)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Repository could not be deleted!", "Repository could not be deleted. Please try again later.");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Repository!", error);
            console.error(error);
        });
    }

}
