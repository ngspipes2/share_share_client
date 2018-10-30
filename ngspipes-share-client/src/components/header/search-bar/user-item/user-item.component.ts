import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

    @Input()
    userName : string;



    constructor(private router : Router) { }



    clicked() {
        this.router.navigate(['/users/' + this.userName]);
    }

}
