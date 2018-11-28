import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Repository } from '../../../../../entities/repository';
import { SessionService } from '../../../../../services/session.service';
import { OperationsManager } from '../../../../operations.manager';

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
                private router : Router,
                private operationsManager : OperationsManager) { }



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

    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsManager.deleteRepository(this.repository)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    elementClick() {
        this.router.navigate(["/repositories/" + this.repository.repositoryName]);
    }

}
