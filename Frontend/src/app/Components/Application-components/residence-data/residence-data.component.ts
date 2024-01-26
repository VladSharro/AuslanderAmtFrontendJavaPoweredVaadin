import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceOfResidenceSectionLabels } from '../../../Labels/place_of_residence_section_labels';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
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

  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;


  isDataLoading = false;
  isSaveNeeded = false

  isChangesConfirmed = true
  isExtracted = false;
  

  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService, private ocrService: OcrService){
    this.getDataFromUploaded()

  }

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
      const comingExtractedData = await this.ocrService.extractEnrollmentCertificatetData(this.enrollmentCertificateFile!);
      if(comingExtractedData != null){
        this.isExtracted = true
        this.extractedData = comingExtractedData as enrollmentcertificateResponse
        this.isDataLoading = false;
      }else{
        this.snackBarService.openFor(WarningTypes.fileError)
        this.isDataLoading = false;

      }     }catch(error){
      console.error(error)
      this.isDataLoading = false;
      this.snackBarService.openFor(WarningTypes.fileError)

    }    
  }

  checkData(extractedData: enrollmentcertificateResponse | never[]){

    
  }
  residenceNextButtonClicked(){
    if(this.checkIfDataOverwritten()){
      if(this.isChangesConfirmed == true){
        this.nextAccepted()
      }else{
        this.snackBarService.openFor(WarningTypes.confirmNeeded)
      }
  }else{
    this.nextAccepted()
  }
  }

  nextAccepted(){
    if (this.stepperReference && this.stepperReference.selected) {
      const currentStep = this.stepperReference.selected;
      
      if (currentStep.completed !== undefined) {
        currentStep.completed = true;
        this.isSaveNeeded = true
      }
    }
    this.saveData()
    this.gotoNext()
  }


  checkIfDataOverwritten(){
    if(this.isExtracted){
      if(this.extractedData != undefined){
        if(new Date (this.extractedData!.semester_ends_date) <= new Date()){
          return true

        }else{
          return false
        }
      }
      return true
      }
      return false
  }
  


  saveData(){
    
    this.applicationService.setResidenceData(this.residenceData.placeOfResidence, this.residenceData.isPreviousStays, this.residenceData.previousStayAddress, this.residenceData.dateFrom, this.residenceData.dateTo, this.residenceData.residenceAbroadIfRetained, this.residenceData.isResidenceAbroadRetained, this.registrationFile, this.enrollmentCertificateFile);
    this.snackBarService.openFor(WarningTypes.dataSaved)
   

  }

  gotoNext(){
    const buttonElement: HTMLButtonElement = this.hiddenButton.nativeElement;
    buttonElement.click();
  }


  
  extractedDataChanged(){
    if(this.isSaveNeeded){
      this.snackBarService.openNotSavedYetReminder();
    }

   }



  overWriteChanged(event: any){
    if(event.checked){
      this.isChangesConfirmed = false;

    }else{
      this.isChangesConfirmed = true;

    }
  }

  getDataFromUploaded(){

    if(this.applicationService.getApplicationData().isContinue){
      const appData = this.applicationService.getApplicationData()
      this.residenceData = {
        placeOfResidence: appData.placeOfResidence,
        isPreviousStays: appData.isPreviousStays,
        previousStayAddress: appData.previousStayAddress,
        dateFrom: appData.visaValidFrom,
        dateTo:appData.visaValidTo,
        residenceAbroadIfRetained: appData.residenceAbroadIfRetained,
        isResidenceAbroadRetained: appData.isResidenceAbroadRetained,
        
      }
      this.registrationFile = this.applicationService.tempRegistrationFile;
      this.enrollmentCertificateFile = this.applicationService.tempEnrollment

      }else{
        this.residenceData = {
          placeOfResidence: '',
          isPreviousStays: '',
          previousStayAddress: '',
          dateFrom: '',
          dateTo:'',
          residenceAbroadIfRetained: '',
          isResidenceAbroadRetained: '',
          
        }
        this.enrollmentCertificateFile = null
        this.registrationFile = null
      }
    }
}
