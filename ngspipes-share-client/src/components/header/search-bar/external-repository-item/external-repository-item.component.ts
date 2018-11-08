import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-external-repository-item',
    templateUrl: './external-repository-item.component.html',
    styleUrls: ['./external-repository-item.component.scss']
})
export class ExternalRepositoryItemComponent  {

    @Input()
    repositoryName : string;



    constructor(private router : Router) { }



    clicked() {
        this.router.navigate(['/externalrepositories/' + this.repositoryName]);
    }

}
