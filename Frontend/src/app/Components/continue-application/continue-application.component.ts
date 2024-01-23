import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SnackBarService } from '../../Services/snack-bar.service';
import { WarningTypes } from '../../Models/enums/warningEnum';
import { DownloadApplicationService } from '../../Services/download-application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-continue-application',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './continue-application.component.html',
  styleUrl: './continue-application.component.css'
})
export class ContinueApplicationComponent {

  uploadFile: File | null = null
  isContinueDisabled = true;

  constructor(private downloadService: DownloadApplicationService, private snackBarService: SnackBarService, private router: Router){}
  openApplicationInput(){
    const applicationInput = document.getElementById("applicationFileInput");

  if (applicationInput) {
    applicationInput.click();
  } else {
    console.error("File input element not found");
    }
  }

  applicationUpload(event: any){
    const files: FileList = event.target.files;
  if (files && files.length > 0) {
    this.uploadFile = files[0];
    console.log(this.uploadFile.name);
    this.extractData()
  }
  }

    async extractData(){
      const response = await this.downloadService.extract(this.uploadFile!)
      if(response){
        this.isContinueDisabled = false;
        this.snackBarService.openFor(WarningTypes.ExtractSuccess)
      }else{
        this.snackBarService.openFor(WarningTypes.ExtractFailed)
      }
    }


    continue(){
      this.router.navigateByUrl(  `/new-application`);
      
    }
}
