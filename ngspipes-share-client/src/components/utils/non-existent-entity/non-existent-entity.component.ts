import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'app-non-existent-entity',
    templateUrl: './non-existent-entity.component.html',
    styleUrls: ['./non-existent-entity.component.scss']
})
export class NonExistentEntityComponent {

    @Input()
    message : string;
    @Input()
    icon : string;
    @Input()
    svgIcon : string;



    constructor(private router : Router,
                private sessionService : SessionService) { }



    myProfileClick() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.router.navigate(['/users/' + currentUserName]);
    }

}
