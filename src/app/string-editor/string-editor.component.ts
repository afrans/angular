import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { StringService } from './string.service';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-string-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './string-editor.component.html',
  styleUrls: ['./string-editor.component.css']
})
export class StringEditorComponent  implements OnInit{
  text: string = 'Texto inicial';
  isLoading: boolean = false;
  private httpClient = inject(HttpClient);

  // constructor(
  //   readonly stringService: StringService
  // ) {}

    ngOnInit(): void {
    this.fetchString(); // Fetch the string on component initialization
  }

    fetchString(): void {
    this.isLoading = true;
    this.httpClient.get<{ string: string }>('http://localhost:3000/strings').subscribe({
      next: (response) => {
        this.text = response.string; // Populate the text with the fetched string
      },
      error: (error) => console.error('Error fetching the string', error),
      complete: () => (this.isLoading = false)
    });
  }

  editText(newText: string) {
    this.isLoading = true;
    // this.stringService.updateString(newText).subscribe({
    //   next: (response: { updatedString: string; }) => (this.text = response.updatedString),
    //   error: (error: any) => console.error('Erro ao atualizar a string', error),
    //   complete: () => (this.isLoading = false)
    // });
    this.updateString(newText).subscribe({
      next: (response: { updatedString: string; }) => { 
        this.text = response.updatedString; 
        console.log(this.text) },
      error: (error: any) => console.error('Erro ao atualizar a string', error),
      complete: () => (this.isLoading = false)
    });
  }

  // private apiUrl = 'http://localhost:3000/strings/1';

    private apiUrl = 'http://localhost:3000/strings';


  updateString(newValue: string): Observable<{ updatedString: string }> {
    console.log('updateString', newValue);
    console.log('Enviando PATCH para:', this.apiUrl, 'com dados:', { string: newValue });
    
    return this.httpClient.patch<{ string: string }>(this.apiUrl, { string: newValue }).pipe(
      map(response => ({ updatedString: response.string })) // Converte o formato1
    );
  }
}
// test 4
