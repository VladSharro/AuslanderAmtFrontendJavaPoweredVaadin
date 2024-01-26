import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StayDataLabels } from '../../../Labels/stay_data_labels';
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
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';

@Component({
  selector: 'app-stay-data',
  standalone: true,
  imports: [CommonModule,MatStepperModule,
    MatRadioModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule],
  templateUrl: './stay-data.component.html',
  styleUrl: './stay-data.component.css'
})
export class StayDataComponent {

  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;

  isSaveNeeded = false;

  
  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){
    this.getDataFromUploaded()
  }

  stayData = {
    lastEntryDate:'',
    lastEntryVisaType:'',
    visaIssueBy:'',
    visaIssueOn:'',
    visaNumber:'',
    visaValidFrom:'',
    visaValidTo:'',
    lengthOfStay:'',
    purposeOfStay:'',
  }

  visaFile: File | null = null;
  stayLabels = new StayDataLabels();
  lastEntryTypeOptions = [this.stayLabels.entry_visa_type_option_national, this.stayLabels.entry_visa_type_option_schegen, this.stayLabels.entry_visa_type_option_without, this.stayLabels.entry_visa_type_options_eu];
  stayPurposeOptions = [this.stayLabels.purpose_of_stay_option_training]


  openVisaInput(){ 
    // your can use ElementRef for this later
    const visaInput = document.getElementById("visaFileInput");

    if (visaInput) {
      visaInput.click();
    } else {
      console.error("File input element not found");
      }
  }

  

  saveData(){

    this.applicationService.setStayData(this.stayData.lastEntryDate,this.stayData.lastEntryVisaType, this.stayData.visaIssueBy, this.stayData.visaIssueOn ,this.stayData.visaNumber, this.stayData.visaValidFrom, this.stayData.visaValidTo, this.stayData.lengthOfStay, this.stayData.purposeOfStay, this.visaFile)
    this.snackBarService.openFor(WarningTypes.dataSaved)
  }

  extractedDataChanged(){
    if(this.isSaveNeeded){
      this.snackBarService.openNotSavedYetReminder();
    }

   }
  

  visaUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.visaFile = files[0];
      this.extractedDataChanged();

    }
  }



  staySectionButtonClicked(){
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

  gotoNext(){
    const buttonElement: HTMLButtonElement = this.hiddenButton.nativeElement;
    buttonElement.click();
  }

  getDataFromUploaded(){
    if(this.applicationService.getApplicationData().isContinue){
      const appData = this.applicationService.getApplicationData()
      this.stayData = {
        lastEntryDate: appData.lastEntryDate,
        lastEntryVisaType: appData.lastEntryVisaType,
        visaIssueBy: appData.visaIssueBy,
        visaIssueOn: appData.visaIssueOn,
        visaNumber: appData.visaNumber,
        visaValidFrom: appData.visaValidFrom,
        visaValidTo: appData.visaValidTo,
        lengthOfStay: appData.lengthOfStay,
        purposeOfStay: appData.purposeOfStay,
      }
      this.visaFile = this.applicationService.tempVisaFile

    }else{
      this.stayData = {
        lastEntryDate:'',
        lastEntryVisaType:'',
        visaIssueBy:'',
        visaIssueOn:'',
        visaNumber:'',
        visaValidFrom:'',
        visaValidTo:'',
        lengthOfStay:'',
        purposeOfStay:'',
      }
      this.visaFile = null
    }
  }
}
