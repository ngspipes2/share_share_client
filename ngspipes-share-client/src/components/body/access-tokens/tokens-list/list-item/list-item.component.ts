import { Component, Input } from '@angular/core';

import { AccessToken } from '../../../../../entities/access-token';
import { OperationsManager } from '../../../../operations.manager';

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



    constructor(private operationsManager : OperationsManager) { console.log(operationsManager); }



    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsManager.deleteAccessToken(this.token)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

}
