import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-repositories-config-option',
    templateUrl: './repositories-config-option.component.html',
    styleUrls: ['./repositories-config-option.component.scss']
})
export class RepositoriesConfigOptionComponent {

    constructor(private router : Router) { }



    repositoriesConfigClick() {
        this.router.navigate(['/repositoriesconfig']);
    }

}
