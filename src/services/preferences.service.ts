import { Injectable } from '@angular/core';

import { SessionService } from './session.service';

@Injectable()
export class PreferencesService {

    private static PREFERENCE_KEY : string = "{USERNAME}-{PREFERENCE}";



    constructor(private sessionService : SessionService) { }



    public setPreference(key : string, value : string) : Promise<boolean> {
        let preferenceKey = this.getPreferenceKey(key);

        window.localStorage.setItem(preferenceKey, value);

        return Promise.resolve(true);
    }

    public getPreference(key : string, defaultValue ? : string) : Promise<string> {
        let preferenceKey = this.getPreferenceKey(key);

        let value = window.localStorage.getItem(preferenceKey);
        if(!value)
            value = defaultValue;

        return Promise.resolve(value);
    }

    private getPreferenceKey(preference : string) : string {
        let userName = this.getCurrentUserName();
        return PreferencesService
            .PREFERENCE_KEY
            .replace("{USERNAME}", userName)
            .replace("{PREFERENCE}", preference);
    }

    private getCurrentUserName() : string {
        let credentials = this.sessionService.getCurrentCredentials();

        if(credentials)
            return credentials[0];

        return undefined;
    }

}
