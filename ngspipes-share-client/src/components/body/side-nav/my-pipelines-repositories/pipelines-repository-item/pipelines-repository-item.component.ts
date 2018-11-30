import { Component, Input } from '@angular/core';

import { Repository } from '../../../../../entities/repository';
import { SessionService } from '../../../../../services/session.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-pipelines-repository-item',
    templateUrl: './pipelines-repository-item.component.html',
    styleUrls: ['./pipelines-repository-item.component.scss']
})
export class PipelinesRepositoryItemComponent {

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
