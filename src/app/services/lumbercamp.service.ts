import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IStock } from '../model/stock';


@Injectable({
  providedIn: 'root'
})
export class LumbercampService {


    baseurl = environment.lubercampURL;
    constructor(private http: HttpClient) { }

    // GET
    getTypes(): Observable<string[]>  {
        return this.http.get<string[]>(this.baseurl + '/api/stock/types').pipe(catchError(this.errorHandl));
    }

    getStocks(): Observable<IStock[]>  {
        return this.http.get<IStock[]>(this.baseurl + '/api/stock').pipe(catchError(this.errorHandl));
    }

    // Error handling
    errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}
