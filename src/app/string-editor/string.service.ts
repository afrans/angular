import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class StringService {
    // private httpClient = inject(HttpClient);

    //   updateString(newValue: string): Observable<{ updatedString: string }> {
    //     return of({ updatedString: newValue }).pipe(delay(1000));
    //   }
    private apiUrl = 'http://localhost:3000/strings/1';  // URL do json-server

    constructor(
        readonly httpClient: HttpClient
    ) { }

    // updateString(newValue: string): Observable<{ updatedString: string }> {
    //   return this.http.patch<{ text: string }>(this.apiUrl, { text: newValue });
    // }

    updateString(newValue: string): Observable<{ updatedString: string }> {
        return this.httpClient.patch<{ text: string }>(this.apiUrl, { text: newValue }).pipe(
            map(response => ({ updatedString: response.text })) // Converte o formato1
        );
    }
}