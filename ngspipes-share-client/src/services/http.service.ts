import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { SessionService } from './session.service';

class Request {
    method : string;
    url : string;
    headers : Headers;
    body : any
}

@Injectable()
export class HttpService {

    constructor(private http: Http, private sessionService: SessionService) { }



    public get(url : string) : Promise<any> {
        return this.execute({
            method : "GET",
            url : url,
            body : null,
            headers : this.createReadHeaders()
        });
    }

    public post(url : string, body : any) : Promise<any> {
        return this.execute({
            method : "POST",
            url : url,
            body : body,
            headers : this.createWriteHeaders()
        });
    }

    public put(url : string, body : any) : Promise<any> {
        return this.execute({
            method : "PUT",
            url : url,
            body : body,
            headers : this.createWriteHeaders()
        });
    }

    public delete(url : string) : Promise<any> {
        return this.execute({
            method : "DELETE",
            url : url,
            body : null,
            headers : this.createWriteHeaders()
        });
    }

    public uploadFile(url : string, file : any) : Promise<any> {
        let formData : FormData = new FormData();
        formData.append('file', file);

        return this.execute({
            method : "POST",
            url : url,
            body : formData,
            headers : this.createUploadFileHeaders()
        });
    }


    private execute(request : Request) : Promise<Response> {
        let response : Promise<Response> = this.executeRequest(request);

        this.logRequest(request.method, request.url, request.headers, request.body);

        return response
            .then(response => {
                this.logResponse(request.method, request.url, response.status, response.text());
                return response;
            })
            .catch(error => {
                this.logResponse(request.method, request.url, error.status, error.text());

                if(error.status === 0)
                    throw "Server not available!";
                else if(error.status >= 400 || error.status < 500)
                    throw error.text();
                else
                    throw "Server Error!";
            });
    }

    private executeRequest(request : Request) : Promise<Response> {
        if(request.method === "GET")
            return this.http.get(request.url, {headers: request.headers}).toPromise();

        if(request.method === "POST")
            return this.http.post(request.url, request.body, {headers: request.headers}).toPromise();

        if(request.method === "PUT")
            return this.http.put(request.url, request.body, {headers: request.headers}).toPromise();

        if(request.method === "DELETE")
            return this.http.delete(request.url, {headers: request.headers}).toPromise();

        throw "Unknown request method:" + request.method + "!";
    }

    private createReadHeaders() : Headers {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        headers.append('Accept', 'application/json');

        if(credentials)
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));

        return headers;
    }

    private createWriteHeaders() : Headers {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append('Accept', 'application/json');

        if(credentials)
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));

        return headers;
    }

    private createUploadFileHeaders() : Headers {
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        if(credentials)
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));

        return headers;
    }

    private logRequest(method : string, url : string, headers : any, body : any) {
        let log = {
            way: "Request",
            method : method,
            url : url,
            headers : headers,
            body : body
        };

        console.log(log);
    }

    private logResponse(method : string, url : string, status : number, body : any) {
        let log = {
            way: "Response",
            method : method,
            url : url,
            status: status,
            body : body
        };

        console.log(log);
    }

}
