import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { AccessToken } from '../../../../../entities/access-token';
import { AccessTokenService } from '../../../../../services/access-token.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { SessionService } from '../../../../../services/session.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    @Output()
    selectedTokenIdChange : EventEmitter<number> = new EventEmitter<number>();
    @Input()
    selectedTokenId : number;

    tokenSubscription : any;

    tokens : AccessToken[] = [];
    loading : boolean;
    filterText : string = "";
    filterAcceptWriteAccess : boolean = true;



    constructor(private accessTokenService : AccessTokenService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.tokenSubscription = this.accessTokenService.tokenEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.tokenSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        let userName = this.sessionService.getCurrentCredentials()[0];
        this.accessTokenService.getAccessTokensOfUser(userName)
        .then(tokens => {
            this.loading = false;

            this.tokens = tokens.sort((a, b) => {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;

                return 0;
            });
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting Access Tokens!", error);
            console.error(error);
        });
    }

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

    tokenClick(token : AccessToken) {
        this.selectToken(token.id);
    }

    selectToken(tokenId : number) {
        this.selectedTokenId = tokenId;
        this.selectedTokenIdChange.emit(tokenId);
    }

    filter(token : AccessToken) {
        let filter = this.filterText.toLowerCase();
        let name = token.name.toLowerCase();

        if(name.indexOf(filter) === -1)
            return false;

        if(!this.filterAcceptWriteAccess && token.writeAccess)
            return false;

        return true;
    }

    isSelected(token : AccessToken) {
        return this.selectedTokenId === token.id;
    }

}
