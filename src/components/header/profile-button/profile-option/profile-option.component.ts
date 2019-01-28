import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../../../services/session.service';

@Component({
    selector: 'app-profile-option',
    templateUrl: './profile-option.component.html',
    styleUrls: ['./profile-option.component.scss']
})
export class ProfileOptionComponent {

    constructor(private router : Router,
                private sessionService : SessionService) { }



    profileClick() {
        let userName = this.sessionService.getCurrentCredentials()[0];
        this.router.navigate(['/users/' + userName]);
    }

}
