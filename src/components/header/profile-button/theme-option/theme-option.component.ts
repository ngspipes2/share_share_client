import { Component, OnInit } from '@angular/core';

import { DialogManager } from '../../../dialog/dialog.manager';
import { ThemeService } from '../../../../services/theme.service';

@Component({
    selector: 'app-theme-option',
    templateUrl: './theme-option.component.html',
    styleUrls: ['./theme-option.component.scss']
})
export class ThemeOptionComponent implements OnInit {

    currentTheme : string;



    constructor(private dialogManager : DialogManager,
                private themeService : ThemeService) { }



    ngOnInit() {
        this.themeService.getTheme()
        .then(theme => this.currentTheme = theme)
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting theme!", error)
            console.error(error);
        });
    }

    showTheme(theme : string) {
        this.themeService.setTheme(theme);
    }

    hideTheme(theme : string) {
        this.setTheme(this.currentTheme);
    }

    setTheme(theme : string) {
        this.themeService.setTheme(theme)
        .then((result) => {
            if(!result)
                this.dialogManager.openErrorDialog("Theme could not be set!", null);
            else
                this.currentTheme = theme;
        })
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error setting theme!", error);
            console.error(error);
        });
    }

}
