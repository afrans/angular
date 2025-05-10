import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root' // Register the service in the root injector
})
export class StringService {

    private apiUrl = 'http://localhost:3000/strings';  // URL do json-server

    constructor(
        private httpClient: HttpClient
    ) { }

    fetchString(): Observable<{ string: string }> {
        return this.httpClient.get<{ string: string }>(this.apiUrl);
    }

    updateString(newValue: string): Observable<{ updatedString: string }> {
        return this.httpClient.patch<{ string: string }>(this.apiUrl, { string: newValue }).pipe(
            map(response => ({ updatedString: response.string })) // Convert the format
        );
    }
}