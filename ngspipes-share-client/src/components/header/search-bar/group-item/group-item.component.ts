import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-group-item',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent {

    @Input()
    groupName : string;



    constructor(private router : Router) { }



    clicked() {
        this.router.navigate(['/groups/' + this.groupName]);
    }

}
