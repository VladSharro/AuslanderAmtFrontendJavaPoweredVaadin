import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {stepperLabels} from '../../Labels/Stepper-labels'
import { Router } from '@angular/router';
import { ApplicationService } from '../../Services/application.service';
import { DownloadApplicationService } from '../../Services/download-application.service';

@Component({
  selector: 'app-download-application',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, ],
  templateUrl: './download-application.component.html',
  styleUrl: './download-application.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DownloadApplicationComponent {

  constructor(private router: Router, private downloadService: DownloadApplicationService){}
  labels = new stepperLabels()

  downloadCurrentApplication(){
    this.downloadService.downloadApplication();
  }
}

