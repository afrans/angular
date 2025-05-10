import { Component } from '@angular/core';

import { StringEditorComponent } from './string-editor/string-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [StringEditorComponent],
})
export class AppComponent {}
