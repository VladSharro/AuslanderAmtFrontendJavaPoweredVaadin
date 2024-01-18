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
  isPreviewDisabled= true;

  constructor(private router: Router, private appPreview: AppPreviewService, private ocrService: OcrService,private snackBarService: SnackBarService){}



  doneLabels = new DoneLabels();

  doneApplication(){
   // this.router.navigateByUrl('previewApplication');
      this.load()
  }

  preview(){
    this.appPreview.openApplicationFile("assets/user_form.pdf")
  }

  async load(){
    console.log("waiting finished")
    this.isLoading = true;

    const response = await this.ocrService.generateApplicationForm()
    if(response == true){
      this.snackBarService.openFor(WarningTypes.FormCreated)
      this.isPreviewDisabled = false;
    }else{
      this.snackBarService.openFor(WarningTypes.FormCreatError)

    }
    this.isLoading = false
    console.log("Data is back")
    this.isLoading = false;

  }
}