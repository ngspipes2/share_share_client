import { Injectable } from '@angular/core';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import saveAs from 'file-saver';

import { SessionService } from './session.service';

class Request {
    method : string;
    url : string;
    headers : Headers;
    body : any;
    responseType : ResponseContentType;
}

@Injectable()
export class HttpService {

    constructor(private http: Http, private sessionService: SessionService) { }



    public get(url : string) : Promise<any> {
        return this.execute({
            method : "GET",
            url : url,
            body : null,
            headers : this.createReadHeaders(),
            responseType : null
        });
    }

    public post(url : string, body : any) : Promise<any> {
        return this.execute({
            method : "POST",
            url : url,
            body : body,
            headers : this.createWriteHeaders(),
            responseType : null
        });
    }

    public put(url : string, body : any) : Promise<any> {
        return this.execute({
            method : "PUT",
            url : url,
            body : body,
            headers : this.createWriteHeaders(),
            responseType : null
        });
    }

    public delete(url : string) : Promise<any> {
        return this.execute({
            method : "DELETE",
            url : url,
            body : null,
            headers : this.createWriteHeaders(),
            responseType : null
        });
    }

    public uploadFile(url : string, file : any, body? : any) : Promise<any> {
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
                          resolve(xhr.response);
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

    public downloadFile(url : string, body? : any) : Promise<any> {
        return this.execute({
            method : "POST",
            url : url,
            body : body,
            headers : this.createWriteHeaders(),
            responseType : ResponseContentType.Blob
        }).then(response => {
            let file = response.blob();
            let fileName = this.getFileNameFromResponseContentDisposition(response);
            saveAs(file, fileName);
            return response;
        });;
    }

    private getFileNameFromResponseContentDisposition(res: any) : string {
        const contentDisposition = res.headers.get('content-disposition') || '';

        if(contentDisposition === "")
            return "file";

        const matches = /filename=([^;]+)/ig.exec(contentDisposition);
        const fileName = (matches[1] || 'untitled').trim();
        return fileName;
    };


    private execute(request : Request) : Promise<Response> {
        let response : Promise<Response> = this.executeRequest(request);

        this.logRequest(request.method, request.url, request.headers, request.body, request.responseType);

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
            return this.http.get(request.url, {headers: request.headers, responseType: request.responseType}).toPromise();

        if(request.method === "POST")
            return this.http.post(request.url, request.body, {headers: request.headers, responseType: request.responseType}).toPromise();

        if(request.method === "PUT")
            return this.http.put(request.url, request.body, {headers: request.headers, responseType: request.responseType}).toPromise();

        if(request.method === "DELETE")
            return this.http.delete(request.url, {headers: request.headers, responseType: request.responseType}).toPromise();

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

    private logRequest(method : string, url : string, headers : any, body : any, responseType : ResponseContentType) {
        let log = {
            way: "Request",
            method : method,
            url : url,
            headers : headers,
            body : body,
            responseType : responseType
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
