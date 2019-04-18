import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tutorials',
    templateUrl: './tutorials.component.html',
    styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent {

    @Input()
    tutorials : any[];



    constructor(private router : Router) { }



    select(tutorial : string) {
        this.router.navigate(['/help'], { queryParams: { tutorial: tutorial } });
    }

}
