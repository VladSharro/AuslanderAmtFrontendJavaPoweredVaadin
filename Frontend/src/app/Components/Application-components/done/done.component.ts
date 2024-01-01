import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoneLabels } from '../../../Labels/done-data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent {
  doneLabels = new DoneLabels();

  doneApplication(){
  }

}
