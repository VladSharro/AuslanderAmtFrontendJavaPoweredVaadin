import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceOfResidenceSectionLabels } from '../../../Labels/place_of_residence_section_labels';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApplicationService } from '../../../Services/application.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';
import { enrollmentcertificateResponse } from '../../../Models/apiResponseModels/enrollmentcertificateResponse';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OcrService } from '../../../Services/ocr.service';


@Component({
  selector: 'app-residence-data',
  standalone: true,
  imports: [CommonModule,
    MatStepperModule,
    MatRadioModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
    ],
  templateUrl: './residence-data.component.html',
  styleUrl: './residence-data.component.css'
})
export class ResidenceDataComponent {

  @Output() thirdStepperValidityChange = new EventEmitter<boolean>();


  isDataLoading = false;
  isNextDisabled = true;
  isNextAllowed = false;

  isOverwriteSlideOn = false;

  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService, private ocrService: OcrService){}

  residence_labels = new PlaceOfResidenceSectionLabels();

  registrationFile: File | null = null;
  enrollmentCertificateFile: File | null = null

  extractedData: enrollmentcertificateResponse | undefined;



  residenceData = {
    placeOfResidence: '',
    isPreviousStays: '',
    previousStayAddress: '',
    dateFrom: '',
    dateTo:'',
    residenceAbroadIfRetained: '',
    isResidenceAbroadRetained: '',
    
  }


  yes_no_options = [this.residence_labels.option_yes, this.residence_labels.option_No];


  openRegistrationInput(){ 
    // your can use ElementRef for this later
    const registrationInput = document.getElementById("registrationFileInput");

    if (registrationInput) {
       registrationInput.click();
    } else {
      console.error("File input element not found");
      }
  }

  openCertificateEnrollmentInput(){ 
    // your can use ElementRef for this later
    const enrollmentInput = document.getElementById("enrollmentFileInput");

    if (enrollmentInput) {
      enrollmentInput.click();
    } else {
      console.error("File input element not found");
      }
  }

  isAddressAbroadRetained(): boolean{
    if (this.residenceData.isResidenceAbroadRetained === "Yes"){
      return true;
    }else{
      return false;
    }
  }


  isPreviousAddressInGermany(): boolean{
    if (this.residenceData.isPreviousStays === "Yes"){
      return true;
    }else{
      return false;
    }
  }


  registrationUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.registrationFile = files[0];
      console.log(this.registrationFile.name);
      console.log(2)

    }
  }

  enrollmentCertificateUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.enrollmentCertificateFile = files[0];
      console.log(this.enrollmentCertificateFile.name);
      this.extractData()


    }
  } 

  private async extractData(){
    this.isDataLoading = true
    try{
      const extractedData = await this.ocrService.extractEnrollmentCertificatetData(this.enrollmentCertificateFile!);
      this.checkData(extractedData)
    }catch(error){
      console.error(error)
      this.isDataLoading = false;
      this.snackBarService.openFor(WarningTypes.fileError)

    }
    console.log("I am back")
    
  }

  checkData(extractedData: enrollmentcertificateResponse | never[]){
    this.isDataLoading = false

    if (extractedData instanceof Array && extractedData.length === 0) {
      // Handle the case where it's an empty array (never[])
      this.snackBarService.openFor(WarningTypes.fileError)
      return;
    }else{
      const enrollmentData = extractedData as enrollmentcertificateResponse
      if(new Date (enrollmentData.semester_ends_date) <= new Date()){
        this.snackBarService.openFor(WarningTypes.wrongEnrollmentDate)
        this.isNextAllowed = false;
        this.thirdStepperValidityChange.emit(false);

      }else{
        this.isNextAllowed = true;
      }

    }
  }
  residenceNextButtonClicked(){
    console.log("Here1")
    if(!this.isNextAllowed){
      this.snackBarService.openFor(WarningTypes.confirmNeeded)
      console.log("Here2")

    }

  }

  saveData(){
    
    this.applicationService.setResidenceData(this.residenceData.placeOfResidence, this.residenceData.isPreviousStays, this.residenceData.previousStayAddress, this.residenceData.dateFrom, this.residenceData.dateTo, this.residenceData.residenceAbroadIfRetained, this.residenceData.isResidenceAbroadRetained, this.registrationFile, this.enrollmentCertificateFile);
    this.snackBarService.openFor(WarningTypes.dataSaved)
    this.isNextDisabled = false
    if(this.isNextAllowed){
    this.thirdStepperValidityChange.emit(true);
    }else{
      this.thirdStepperValidityChange.emit(false);

    }

  }


  
  extractedDataChanged(){
    this.thirdStepperValidityChange.emit(false);
    this.isNextDisabled = true
    this.snackBarService.openNotSavedYetReminder();

   }



  overWriteChanged(event: any){
    if(event.checked){
      this.isOverwriteSlideOn = true

      // this.isOverWritten = true
      this.isNextAllowed = true
      this.thirdStepperValidityChange.emit(true);

    }else{
      this.isOverwriteSlideOn = false;

      // this.isOverWritten = false
      this.isNextAllowed = false
    }
  }
}
