import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-missing-data-dialogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missing-data-dialogue.component.html',
  styleUrl: './missing-data-dialogue.component.css'
})
export class MissingDataDialogueComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
