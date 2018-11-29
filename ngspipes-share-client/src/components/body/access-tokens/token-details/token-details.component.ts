import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { AccessToken } from '../../../../entities/access-token';
import { AccessTokenService } from '../../../../services/access-token.service';
import { SessionService } from '../../../../services/session.service';
import { OperationsManager } from '../../../operations.manager';
import { DialogManager } from '../../../dialog/dialog.manager';

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
    loading : boolean;



    constructor(private accessTokensService : AccessTokenService,
                private sessionService : SessionService,
                private dialogManager : DialogManager,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.tokenSubscription = this.accessTokensService.tokenEvent.subscribe(() => {
            if(this.tokenId)
                this.load()
        });

        if(this.tokenId)
            this.load();
    }

    ngOnChanges() {
        if(this.tokenId)
            this.load();
    }

    ngOnDestroy() {
        this.tokenSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.accessTokensService.getAccessToken(this.tokenId)
        .then(token => {
            this.loading = false;
            this.token = token;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting Access Token!", error);
            console.error(error);
        });
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveAccessToken(this.token);
    }

    deleteClick() : Promise<any> {
        return this.operationsManager.deleteAccessToken(this.token);
    }

}
