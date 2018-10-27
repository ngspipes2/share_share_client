import { Component, OnInit, OnDestroy } from '@angular/core';

import { ThemeService } from '../services/theme.service';
import { DialogManager } from '../components/dialog/dialog.manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    themeChangeSubscription : any;

    theme : string;



    constructor(private themeService : ThemeService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.themeChangeSubscription = this.themeService.themeChangeEvent.subscribe((theme) => {
            this.loadTheme();
        });

        this.loadTheme();
    }

    ngOnDestroy() {
        this.themeChangeSubscription.unsubscribe();
    }

    loadTheme() {
        this.themeService.getTheme()
            .then(theme => this.theme = theme)
            .catch(error => this.dialogManager.openErrorDialog("Error getting theme!", error));
    }

}
