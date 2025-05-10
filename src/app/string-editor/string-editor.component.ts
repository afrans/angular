import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringService } from './string.service';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-string-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './string-editor.component.html',
  styleUrls: ['./string-editor.component.css']
})
export class StringEditorComponent implements OnInit {
  text: string = 'Texto inicial';
  isLoading: boolean = false;
  isEditing: boolean = false; // New property to control editing state

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/strings';

  constructor(
    private stringService: StringService
  ) { }

  ngOnInit(): void {
    this.fetchString(); // Fetch the string on component initialization
  }

  fetchString(): void {
    this.isLoading = true;
    this.stringService.fetchString().subscribe({
      next: (response) => {
        this.text = response.string;
      },
      error: (error) => console.error('Error fetching the string', error),
      complete: () => (this.isLoading = false)
    });
  }

  editText(newText: string): void {
    this.isLoading = true;

    // Simulate a delay to show the loading animation
    setTimeout(() => {
      this.stringService.updateString(newText).subscribe({
        next: (response) => {
          this.text = response.updatedString; // Update the text with the server response
          console.log('Texto atualizado:', this.text);
        },
        error: (error) => console.error('Error updating the string', error),
        complete: () => {
          this.isLoading = false; // Hide the loading animation
        }
      });
    }, 1000); // Add a 500ms delay before starting the request
  }

  startEditing(inputElement: HTMLInputElement): void {
    this.isEditing = true; // Enable editing
    inputElement.focus();
  }

  stopEditing(newText: string, inputElement: HTMLInputElement): void {
    if (newText !== this.text) {
      this.editText(newText);
    }
     this.isEditing = false; // Disable editing
    inputElement.blur(); // Remove focus from the input field

  }
}
