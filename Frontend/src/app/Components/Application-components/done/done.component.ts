import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoneLabels } from '../../../Labels/done-data';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppPreviewService } from '../../../Services/app-preview.service';


@Component({
  selector: 'app-done',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent {

  constructor(private router: Router, private appPreview: AppPreviewService){}
  doneLabels = new DoneLabels();

  doneApplication(){
   // this.router.navigateByUrl('previewApplication');

  }

  preview(){
    this.appPreview.openApplicationFile("assets/provisional_certificate.pdf")
  }

}
