import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-repository-item',
    templateUrl: './repository-item.component.html',
    styleUrls: ['./repository-item.component.scss']
})
export class RepositoryItemComponent {

    @Input()
    repositoryName : string;



    constructor(private router : Router) { }



    clicked() {
        this.router.navigate(['/repositories/' + this.repositoryName]);
    }

}
