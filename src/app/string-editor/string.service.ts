import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// @Injectable()
@Injectable({
  providedIn: 'root' // Registra o serviço no root injector
})
export class StringService {
    // private httpClient = inject(HttpClient);

    //   updateString(newValue: string): Observable<{ updatedString: string }> {
    //     return of({ updatedString: newValue }).pipe(delay(1000));
    //   }
    private apiUrl = 'http://localhost:3000/strings';  // URL do json-server

    constructor(
        private httpClient: HttpClient
    ) { }

    // updateString(newValue: string): Observable<{ updatedString: string }> {
    //   return this.http.patch<{ text: string }>(this.apiUrl, { text: newValue });
    // }

    fetchString(): Observable<{ string: string }> {
        return this.httpClient.get<{ string: string }>(this.apiUrl);
    }

    updateString(newValue: string): Observable<{ updatedString: string }> {
        return this.httpClient.patch<{ string: string }>(this.apiUrl, { string: newValue }).pipe(
            map(response => ({ updatedString: response.string })) // Converte o formato1
        );
    }
}