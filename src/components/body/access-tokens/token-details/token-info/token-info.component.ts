import { Component, Input } from '@angular/core';

import { AccessToken } from '../../../../../entities/access-token';

@Component({
    selector: 'app-token-info',
    templateUrl: './token-info.component.html',
    styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent {

    @Input()
    token : AccessToken;



    constructor() { }



    dateToString(date : Date) : string {
        let day = date.getDate() > 10 ? date.getDate().toString() : '0'+date.getDate().toString();
        let month = (date.getMonth()+1) > 10 ? (date.getMonth()+1).toString() : '0'+(date.getMonth()+1).toString();;
        let year = date.getFullYear();
        let hour = date.getHours() > 10 ? date.getHours().toString() : '0'+date.getHours().toString();
        let minutes = date.getMinutes() > 10 ? date.getMinutes().toString() : '0'+date.getMinutes().toString();

        return day + "-" + month + "-" + year + " " + hour + ":" + minutes;
    }

}
