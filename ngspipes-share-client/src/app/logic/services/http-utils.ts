import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { SessionService } from './session.service';

@Injectable()
export class HttpUtils {

    constructor(private http: Http, private sessionService: SessionService) { }



    public get(url : string) : Promise<any> {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        if(credentials)
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));

        return this.http.get(url, {headers: headers})
            .toPromise()
            .catch(error => {
                this.logError(url, headers, { }, error);

                if(error.status >= 400 || error.status < 500)
                    throw error._body;
                else
                    throw "Error contacting Server!";
            });
    }

    public post(url : string, body : any) : Promise<any> {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        if(credentials) {
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));
            headers.append("Content-Type", "application/json");
        }

        return this.http.post(url, body, {headers: headers})
            .toPromise()
            .catch(error => {
                this.logError(url, headers, body, error);

                if(error.status >= 400 || error.status < 500)
                    throw error._body;
                else
                    throw "Error contacting Server!";
            });
    }

    public put(url : string, body : any) : Promise<any> {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        if(credentials) {
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));
            headers.append("Content-Type", "application/json");
        }

        return this.http.put(url, body, {headers: headers})
            .toPromise()
            .catch(error => {
                this.logError(url, headers, body, error);

                if(error.status >= 400 || error.status < 500)
                    throw error._body;
                else
                    throw "Error contacting Server!";
            });
    }

    public delete(url : string) : Promise<any> {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        if(credentials) {
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));
            headers.append("Content-Type", "application/json");
        }

        return this.http.delete(url, {headers: headers})
            .toPromise()
            .catch(error => {
                this.logError(url, headers, null, error);

                if(error.status >= 400 || error.status < 500)
                    throw error._body;
                else
                    throw "Error contacting Server!";
            });
    }

    private logError(url, headers, body, error) {
        console.error("Error on request to server!");
        console.error("url:" + url);
        console.error("headers:" + JSON.stringify(headers));
        console.error("body:" + JSON.stringify(body));
        console.error(error);
    }

    public uploadFile(url : string, file : any) : Promise<any> {
        let credentials = this.sessionService.getCurrentCredentials();

        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append("file", file);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));
            xhr.send(formData);

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(xhr);
                    } else {
                        console.log(xhr.response);
                        if(xhr.status === 412) {
                            reject(xhr.response.responseText);
                        } else {
                            reject("Error contacting Server!");
                        }
                    }
                }
            }
        });
    }

}
