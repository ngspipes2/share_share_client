import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-option',
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss']
})
export class ListOptionComponent {

    @Input()
    name : string;
    @Input()
    selected : boolean;
    @Input()
    link : string;



    constructor(private router : Router) { }



    clicked() {
        if(this.link)
            this.router.navigate([this.link]);
    }

}
