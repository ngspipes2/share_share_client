import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PreferencesService } from './preferences.service';



@Injectable()
export class ThemeService {

    public static THEMES : string[] = [
        "soft-light-theme",
        "hard-light-theme",
        "soft-dark-theme",
        "hard-dark-theme"
    ];
    private static DEFAULT_THEME : string = ThemeService.THEMES[0];
    private static THEME_KEY : string = "Theme";



    public themeChangeEvent : Subject<string> = new Subject<string>();



    constructor(private preferencesService : PreferencesService) { }



    public setTheme(theme : string) : Promise<boolean> {
        let key = ThemeService.THEME_KEY;
        let value = theme;

        return this.preferencesService.setPreference(key, value)
            .then(result => {
                if(result)
                    this.themeChangeEvent.next(theme);

                return result;
            });
    }

    public getTheme() : Promise<string> {
        let key = ThemeService.THEME_KEY;
        let defaultValue = ThemeService.DEFAULT_THEME;

        return this.preferencesService.getPreference(key, defaultValue);
    }

}
