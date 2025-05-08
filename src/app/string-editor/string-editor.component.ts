import { Component, inject } from '@angular/core';
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
export class StringEditorComponent {
  text: string = 'Texto inicial';
  isLoading: boolean = false;
  private httpClient = inject(HttpClient);

  // constructor(
  //   readonly stringService: StringService
  // ) {}

  editText(newText: string) {
    this.isLoading = true;
    // this.stringService.updateString(newText).subscribe({
    //   next: (response: { updatedString: string; }) => (this.text = response.updatedString),
    //   error: (error: any) => console.error('Erro ao atualizar a string', error),
    //   complete: () => (this.isLoading = false)
    // });
    this.updateString(newText).subscribe({
      next: (response: { updatedString: string; }) => { this.text = response.updatedString; console.log(this.text) },
      error: (error: any) => console.error('Erro ao atualizar a string', error),
      complete: () => (this.isLoading = false)
    });
  }

  private apiUrl = 'http://localhost:3000/strings/1';

  updateString(newValue: string): Observable<{ updatedString: string }> {
    return this.httpClient.get<{ text: string }>(this.apiUrl).pipe(
      map(response => ({ updatedString: response.text })) // Converte o formato1
    );
  }
}
