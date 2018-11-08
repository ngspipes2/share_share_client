import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-internal-repository-item',
    templateUrl: './internal-repository-item.component.html',
    styleUrls: ['./internal-repository-item.component.scss']
})
export class InternalRepositoryItemComponent {

    @Input()
    repositoryName : string;



    constructor(private router : Router) { }



    clicked() {
        this.router.navigate(['/internalrepositories/' + this.repositoryName]);
    }

}
