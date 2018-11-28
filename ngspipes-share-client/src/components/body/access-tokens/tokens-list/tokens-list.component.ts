import { Component, Output, EventEmitter } from '@angular/core';

import { AccessToken } from '../../../../entities/access-token';
import { OperationsManager } from '../../../operations.manager';

@Component({
  selector: 'app-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss']
})
export class TokensListComponent {

    @Output()
    selectedTokenIdChange : EventEmitter<number> = new EventEmitter<number>();

    selectedTokenId : number;

    creating : boolean;



    constructor(private operationsManager : OperationsManager) { }



    createTokenClick() {
        this.creating = true;

        let accessToken = new AccessToken(0, null, null, null, null, false);

        this.operationsManager.crerateAccessToken(accessToken)
        .then((data) => {
            this.creating = false
            this.selectToken(data.id);
        })
        .catch(() => this.creating = false);
    }

    selectToken(tokenId : number) {
        this.selectedTokenId = tokenId;
        this.selectedTokenIdChange.emit(tokenId);
    }

}
