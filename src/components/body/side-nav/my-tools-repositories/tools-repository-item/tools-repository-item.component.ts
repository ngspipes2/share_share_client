import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Repository } from '../../../../../entities/repository';
import { SessionService } from '../../../../../services/session.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-tools-repository-item',
    templateUrl: './tools-repository-item.component.html',
    styleUrls: ['./tools-repository-item.component.scss']
})
export class ToolsRepositoryItemComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    repository : Repository;

    loginSubscription : any;
    userName : string;
    isOwner : boolean;
    isMember : boolean;



    constructor(private sessionService : SessionService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnChanges() {
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

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteRepository(this.repository);
    }

}
