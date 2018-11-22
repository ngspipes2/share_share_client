import { Component, Input } from '@angular/core';

import { AccessToken } from '../../../../../entities/access-token';
import { AccessTokenService } from '../../../../../services/access-token.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    @Input()
    token : AccessToken;

    @Input()
    selected : boolean;

    deleting : boolean;



    constructor(private dialogManager : DialogManager,
                private accessTokenService : AccessTokenService) { }



    deleteClick(event : any) {
        let title = "Delete Access Token";
        let message = "Are you sure you want delete Access Token: " + this.token.name + " ?";
        let options = ["Yes", "No"];
        this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe((response) => {
            if(response === "Yes")
                this.delete();
        });

        event.stopPropagation();
    }

    delete() {
        this.deleting = true;

        this.accessTokenService.deleteAccessToken(this.token.id)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Access Token not deleted!", "Access Token could not be deleted! Please try again latter.");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Access Token!", error);
            console.error(error);
        });
    }

}
