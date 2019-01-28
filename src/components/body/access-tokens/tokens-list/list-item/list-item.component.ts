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



    constructor(private operationsManager : OperationsManager) { }



    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();

        return this.operationsManager.deleteAccessToken(this.token);
    }

}
