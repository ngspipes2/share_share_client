import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

    @Input()
    userName : string;



    constructor() { }

}
