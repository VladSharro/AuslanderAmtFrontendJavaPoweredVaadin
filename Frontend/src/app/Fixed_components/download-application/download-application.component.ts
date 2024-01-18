import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {stepperLabels} from '../../Labels/Stepper-labels'
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-application',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDividerModule],
  templateUrl: './download-application.component.html',
  styleUrl: './download-application.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DownloadApplicationComponent {

  constructor(private router: Router){}
  labels = new stepperLabels()

  downloadAppLinkClicked(linkName: string){
    if (linkName == this.labels.download_application){
      this.router.navigateByUrl("Guide");
    }
  }
}

