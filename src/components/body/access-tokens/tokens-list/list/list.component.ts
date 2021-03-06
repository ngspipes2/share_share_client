import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { AccessToken } from '../../../../../entities/access-token';
import { AccessTokenService } from '../../../../../services/access-token.service';
import { OperationsManager } from '../../../../operations.manager';
import { SessionService } from '../../../../../services/session.service';

import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

import { Utils } from '../../../../utils/utils';

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

    filters : Filter[];



    constructor(private accessTokenService : AccessTokenService,
                private sessionService : SessionService,
                private operationsManager : OperationsManager) {
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

        let userName = this.sessionService.getCurrentCredentials()[0];
        this.operationsManager.getAccessTokensOfUser(userName)
        .then(tokens => this.tokens = Utils.sort(tokens, token => token.name));
    }

    createTokenClick() : Promise<any> {
        let accessToken = new AccessToken(0, null, null, null, null, false);

        return this.operationsManager.crerateAccessToken(accessToken)
        .then(data => {
            this.selectToken(data.id);
            return data;
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
