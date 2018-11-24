import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { AccessToken } from '../../../../../entities/access-token';
import { AccessTokenService } from '../../../../../services/access-token.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { SessionService } from '../../../../../services/session.service';

import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

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
    creating : boolean;

    filters : Filter[];



    constructor(private accessTokenService : AccessTokenService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "TokenName"),
            new IconFilter(this.acceptReadAccess.bind(this), true, "Read Access", null, "pencil-off"),
            new IconFilter(this.acceptWriteAccess.bind(this), true, "Write Access", null, "pencil")
        ];
    }



    ngOnInit() {
        this.tokenSubscription = this.accessTokenService.tokenEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.tokenSubscription.unsubscribe();
    }

    load() {
        this.tokens = undefined;
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

        this.creating = true;

        this.accessTokenService.createAccessToken(accessToken)
        .then(data => {
            this.creating = false;

            this.selectToken(data.id);
            this.dialogManager.openShowTokenDialog(data.token);
        })
        .catch(error => {
            this.creating = false;
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

    isSelected(token : AccessToken) {
        return this.selectedTokenId === token.id;
    }

    acceptName(token : AccessToken, text : string) {
        let name = token.name.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

    acceptReadAccess(token : AccessToken, accept : boolean) : boolean {
        if(!accept && !token.writeAccess)
            return false;

        return true;
    }

    acceptWriteAccess(token : AccessToken, accept : boolean) : boolean {
        if(!accept && token.writeAccess)
            return false;

        return true;
    }

}
