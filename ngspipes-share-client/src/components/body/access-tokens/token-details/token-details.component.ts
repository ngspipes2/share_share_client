import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { AccessToken } from '../../../../entities/access-token';
import { AccessTokenService } from '../../../../services/access-token.service';
import { OperationsManager } from '../../../operations.manager';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.scss']
})
export class TokenDetailsComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    tokenId : number;

    tokenSubscription : any;

    token : AccessToken;
    loadEvent : Subject<any> = new Subject();



    constructor(private accessTokensService : AccessTokenService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.tokenSubscription = this.accessTokensService.tokenEvent.subscribe(() => {
            if(this.tokenId)
                this.loadEvent.next();
        });

        if(this.tokenId)
            setTimeout(() => this.loadEvent.next());
    }

    ngOnChanges() {
        if(this.tokenId)
            this.loadEvent.next();
    }

    ngOnDestroy() {
        this.tokenSubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.operationsManager.getAccessToken(this.tokenId)
        .then(token => this.token = token);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveAccessToken(this.token);
    }

    deleteClick() : Promise<any> {
        return this.operationsManager.deleteAccessToken(this.token);
    }

}
