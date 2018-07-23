import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SessionService } from './session.service';



@Injectable()
export class PreferencesService {

    private static DEFAULT_THEME : string = "light-theme";
    private static THEME_KEY : string = "{USERNAME}-theme";



    public themeChangeEvent : Subject<string> = new Subject<string>();




    constructor(private sessionService : SessionService) { }



    setTheme(theme : string) : Promise<boolean> {
        let themeKey = this.getPreferenceKey(PreferencesService.THEME_KEY);

        window.localStorage.setItem(themeKey, theme);
        this.themeChangeEvent.next(theme);

        return Promise.resolve(true);
    }

    getTheme() : Promise<string> {
        let themeKey = this.getPreferenceKey(PreferencesService.THEME_KEY);
        let theme = window.localStorage.getItem(themeKey);

        if(!theme)
            theme = PreferencesService.DEFAULT_THEME;

        return Promise.resolve(theme);
    }

    getPreferenceKey(preference : string) : string {
        let userName = "";

        let credentials = this.sessionService.getCurrentCredentials;
        if(credentials)
            userName = credentials[0];

        return preference.replace("{USERNAME}", userName);
    }

}
