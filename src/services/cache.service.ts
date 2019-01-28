import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    private cache : any = { };



    constructor() { }



    get(key: string) : any {
        if(this.cache[key])
            console.log("Cache hit for " + key);
        else
            console.log("Cache miss for " + key);

        return this.cache[key];
    }

    put(key : string, content : any) {
        this.cache[key] = content;
    }

    remove(key : string) {
        this.cache[key] = undefined;
    }

}
