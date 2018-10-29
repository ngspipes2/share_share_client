import { Component } from '@angular/core';

import { DialogManager } from '../../../dialog/dialog.manager';
import { ThemeService } from '../../../../services/theme.service';

@Component({
    selector: 'app-theme-option',
    templateUrl: './theme-option.component.html',
    styleUrls: ['./theme-option.component.scss']
})
export class ThemeOptionComponent {

    constructor(private dialogManager : DialogManager,
                private themeService : ThemeService) { }



    setTheme(theme : string) {
        this.themeService.setTheme(theme)
        .then((result) => {
            if(!result)
                this.dialogManager.openErrorDialog("Theme could not be set!", null);
        })
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error setting theme!", error);
            console.error(error);
        });
    }

}
