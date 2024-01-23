import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoneLabels } from '../../../Labels/done-data';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppPreviewService } from '../../../Services/app-preview.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OcrService } from '../../../Services/ocr.service';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';
import { MaillingService } from '../../../Services/mailling.service';


@Component({
  selector: 'app-done',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent {

  finalForm: File | null = null
  isLoading = false;
  isPreviewDisabled = true;
  generatedForm: File | null = null
  blobUrl = ''

  constructor(private router: Router, private appPreview: AppPreviewService, private ocrService: OcrService,private snackBarService: SnackBarService, private maillingService: MaillingService){}



  doneLabels = new DoneLabels();

  doneApplication(){
   // this.router.navigateByUrl('previewApplication');
   if(this.isPreviewDisabled){
      this.load()
   }else{
    this.maillingService.setApplicationFile(this.generatedForm!)
    this.router.navigateByUrl('mailling')
   }
  }

  preview(){
    this.appPreview.openApplicationFile(this.blobUrl)
  }

  async load(){
    console.log("waiting finished")
    this.isLoading = true;

    const response = await this.ocrService.generateApplicationForm()
    if(response != null){
      this.isPreviewDisabled = false;
      this.blobUrl = URL.createObjectURL(response);

      this.generatedForm = new File([response], "application")
      this.snackBarService.openFor(WarningTypes.FormCreated)
    }else{
      this.snackBarService.openFor(WarningTypes.FormCreatError)

    }
    this.isLoading = false
    console.log("Data is back")
  }
}