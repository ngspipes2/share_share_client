import { Component, Output, EventEmitter } from '@angular/core';

import { AccessToken } from '../../../../entities/access-token';
import { AccessTokenService } from '../../../../services/access-token.service';
import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
  selector: 'app-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss']
})
export class TokensListComponent {

    @Output()
    selectedTokenIdChange : EventEmitter<number> = new EventEmitter<number>();

    selectedTokenId : number;

    loading : boolean;



    constructor(private accessTokenService : AccessTokenService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



    createTokenClick() {
        this.dialogManager.openNewAccessTokenNameDialog().afterClosed().subscribe(name => {
            if(name)
                this.createToken(name);
        });
    }

    createToken(name : string) {
        let userName = this.sessionService.getCurrentCredentials()[0];
        let accessToken = new AccessToken(0, userName, null, name, null, false);

        this.loading = true;

        this.accessTokenService.createAccessToken(accessToken)
        .then(data => {
            this.loading = false;

            this.selectToken(data.id);
            this.dialogManager.openShowTokenDialog(data.token);
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error creating Access Token!", error);
            console.error(error);
        });
    }

    selectToken(tokenId : number) {
        this.selectedTokenId = tokenId;
        this.selectedTokenIdChange.emit(tokenId);
    }

}
