import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { AccessToken } from '../../../../entities/access-token';
import { AccessTokenService } from '../../../../services/access-token.service';
import { SessionService } from '../../../../services/session.service';
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
    saving : boolean;
    deleting : boolean;



    constructor(private accessTokensService : AccessTokenService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



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

    saveClick() {
        this.saving = true;

        this.accessTokensService.updateAccessToken(this.token)
        .then(result => {
            this.saving = false;
            if(!result)
                this.dialogManager.openErrorDialog("Access Token could not be saved!", "Access Token could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Access Token saved successfully!", "");
        })
        .catch(error => {
            this.saving = false;
            this.dialogManager.openErrorDialog("Error saving Access Token!", error);
            console.error(error);
        });
    }

    deleteClick() {
        let title = "Delete Access Token";
        let message = "Are you sure you wnat to delete Access Token: " + this.token.name + " ?";
        let options = ["Yes", "No"];
        this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteToken();
        });
    }

    deleteToken() {
        this.deleting = true;

        this.accessTokensService.deleteAccessToken(this.tokenId)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Access Token could not be deleted!", "Access Token could not be deleted! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Access Token deleted successfully!", "");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Access Token!", error);
            console.error(error);
        });
    }

}
