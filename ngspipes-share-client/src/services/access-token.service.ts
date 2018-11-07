import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { AccessToken } from '../entities/access-token';

export class NewAccessTokenData {
    constructor(public id : number, public token : string) { }
}

@Injectable()
export class AccessTokenService {

    tokenEvent = new Subject<number>();
    tokenCreateEvent = new Subject<number>();
    tokenUpdateEvent = new Subject<number>();
    tokenDeleteEvent = new Subject<number>();



    constructor(private httpService: HttpService) {
        this.tokenCreateEvent.subscribe(tokenId => this.tokenEvent.next(tokenId));
        this.tokenUpdateEvent.subscribe(tokenId => this.tokenEvent.next(tokenId));
        this.tokenDeleteEvent.subscribe(tokenId => this.tokenEvent.next(tokenId));
    }



    public createAccessToken(token : AccessToken) : Promise<NewAccessTokenData> {
        let url = ServersRoutes.CREATE_ACCESS_TOKEN_ROUTE;

        let data = this.clienteTokenToServerToken(token);

        return this.httpService.post(url, data)
            .then((response) => {
                let data = response.json();
                let newTokenData = new NewAccessTokenData(data.id, data.token);
                this.fireCreateEvent(newTokenData.id);
                return newTokenData;
            });
    }

    private clienteTokenToServerToken(token : AccessToken) : any {
        return {
            id : token.id,
            owner : { userName : token.ownerName },
            creationDate : token.creationDate,
            name : token.name,
            description : token.description,
            writeAccess : token.writeAccess
        };
    }

    public updateAccessToken(token : AccessToken) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_ACCESS_TOKEN_ROUTE.replace("{tokenId}", token.id.toString());

        let data = this.clienteTokenToServerToken(token);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(token.id);
                return true;
            });
    }

    public deleteAccessToken(tokenId : number) : Promise<boolean> {
        let url = ServersRoutes.DELETE_ACCESS_TOKEN_ROUTE.replace("{tokenId}", tokenId.toString());

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(tokenId);
                return true;
            });
    }

    public getAccessTokensOfUser(userName : string) : Promise<AccessToken[]> {
        let url = ServersRoutes.GET_ACCESS_TOKENS_OF_USER + "?userName=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverTokensToClientTokens(data);
            });
     }

    private serverTokensToClientTokens(tokens : any[]) : AccessToken[] {
        return tokens.map(this.serverTokenToClientToken);
    }

    private serverTokenToClientToken(token : any) : AccessToken {
         return new AccessToken(
             token.id,
             token.owner.userName,
             new Date(token.creationDate),
             token.name,
             token.description,
             token.writeAccess
         );
     }


    fireCreateEvent(tokenId: number) {
        this.tokenCreateEvent.next(tokenId);
    }

    fireUpdateEvent(tokenId: number) {
        this.tokenUpdateEvent.next(tokenId);
    }

    fireDeleteEvent(tokenId: number) {
        this.tokenDeleteEvent.next(tokenId);
    }

}
