import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {interval, merge, Observable, of, pipe, throwError} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, take} from 'rxjs/operators';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {

    }

    getPatient(phone: string): Observable<any> {
        let url = 'api/patient/phone/' + phone
        return this.http.get(url).pipe(
            catchError(err => of(console.error(err)))
        )
    }

    getPatients(): Observable<any> {
        let url = 'api/patient/'
        return this.http.get(url).pipe(
            catchError(err => of(console.error(err)))
        )
    }

    getCalls(): Observable<any> {
        let url = 'api/call/'
        return this.http.get(url).pipe(
            catchError(err => of(console.error(err)))
        )
    }


    saveCall(data: any): Observable<any> {
        let url = 'api/call'
        return this.http.post(url, data)
    }
}