import { Component, Input } from '@angular/core';

import { Repository } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-tools-repository-item',
    templateUrl: './tools-repository-item.component.html',
    styleUrls: ['./tools-repository-item.component.scss']
})
export class ToolsRepositoryItemComponent {

    @Input()
    repository : Repository;

    loginSubscription : any;
    userName : string;
    isOwner : boolean;
    isMember : boolean;
    deleting : boolean;



    constructor(private sessionService : SessionService,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];
        this.isOwner = this.repository.ownerName === this.userName;
        this.isMember = this.repository.ownerName !== this.userName;
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
