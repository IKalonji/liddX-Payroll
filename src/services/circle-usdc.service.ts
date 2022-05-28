import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";


@Injectable(
    {providedIn: 'root'}
)

export class CircleUSDCService {
    
    ENDPOINT:string = environment.CIRCLE_ENDPOINT;
    apiKey:string = environment.circleUSDC;

    constructor(private http: HttpClient){

        if ( this.ENDPOINT == null ||
            this.apiKey == null
        ){
            throw new Error("Circle endpint and api key required");
        }
    }

    
    
}