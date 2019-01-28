import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../../../../../entities/user';
import { UserService } from '../../../../../services/user.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    userSubscription : any;

    user : User;
    loadEvent : Subject<any> = new Subject();



    constructor(private userService : UserService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.userSubscription = this.userService.userUpdateEvent.subscribe(() => this.loadEvent.next());
        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.loadEvent.next();
    }

    load() : Promise<any> {
        return this.operationsManager.getUser(this.userName)
        .then(user => this.user = user);
    }

    changeImage(file : any) : Promise<any> {
        if(!file)
            return Promise.resolve(true);

        return this.operationsManager.changeUserImage(this.user, file);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveUser(this.user);
    }

}
