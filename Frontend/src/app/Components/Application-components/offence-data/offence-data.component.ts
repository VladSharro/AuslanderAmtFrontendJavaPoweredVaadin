import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { offenciesLabels } from '../../../Labels/offencies_data_labels';
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
  selector: 'app-offence-data',
  standalone: true,
  imports: [CommonModule,MatRadioModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,MatStepperModule],
  templateUrl: './offence-data.component.html',
  styleUrl: './offence-data.component.css'
})
export class OffenceDataComponent {

  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;

  isDataLoading = false;
  isSaveNeeded = false;




  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){
    this.getDataFromUploaded()

  }

  offencesLabel = new offenciesLabels();

offencesData = {

  isConvicted: '',
  convictionPlace: '',
  convictionReason: '',
  convictionTypeAndamount: '',
  isUnderInvestigation: '',
  investigationPlace: '',
  investigationAuthority: '',
  isExpelledOrDeported: '',
  expelledFrom: '',
  expelledOn: '',
  isEntryApplicationRejected: '',
  entryRejectedFrom: '',
  entyRejectedOn: '',
  isResidenceApplicationRejected: '',
  residenceRejectedFrom: '',
  residenceRejectedOn: ''
}

placesOptions = [this.offencesLabel.inDeutschlandOption, this.offencesLabel.abroadOption];
yesNoOptions = [this.offencesLabel.yes_option, this.offencesLabel.no_option];


saveData(){

  this.applicationService.setOffenceData(this.offencesData.isConvicted, this.offencesData.convictionPlace, this.offencesData.convictionReason, this.offencesData.convictionTypeAndamount, this.offencesData.isUnderInvestigation, this.offencesData.investigationPlace, this.offencesData.investigationAuthority, this.offencesData.isExpelledOrDeported, this.offencesData.expelledFrom, this.offencesData.expelledOn, this.offencesData.isEntryApplicationRejected, this.offencesData.entryRejectedFrom, this.offencesData.entyRejectedOn, this.offencesData.isResidenceApplicationRejected, this.offencesData.residenceRejectedFrom, this.offencesData.residenceRejectedOn)
  this.snackBarService.openFor(WarningTypes.dataSaved)
}


extractedDataChanged(){
  if(this.isSaveNeeded){
    this.snackBarService.openNotSavedYetReminder();
  }

 }

getDataFromUploaded(){
  if(this.applicationService.getApplicationData().isContinue){
    const appData = this.applicationService.getApplicationData()
    this.offencesData = {

      isConvicted: appData.isConvicted,
      convictionPlace: appData.convictionPlace,
      convictionReason: appData.convictionReason,
      convictionTypeAndamount: appData.convictionTypeAndamount,
      isUnderInvestigation: appData.isUnderInvestigation,
      investigationPlace: appData.investigationPlace,
      investigationAuthority: appData.investigationAuthority,
      isExpelledOrDeported: appData.isExpelledOrDeported,
      expelledFrom: appData.expelledFrom,
      expelledOn: appData.expelledOn,
      isEntryApplicationRejected: appData.isEntryApplicationRejected,
      entryRejectedFrom: appData.entryRejectedFrom,
      entyRejectedOn: appData.entyRejectedOn,
      isResidenceApplicationRejected: appData.isResidenceApplicationRejected,
      residenceRejectedFrom: appData.residenceRejectedFrom,
      residenceRejectedOn: appData.residenceRejectedOn
    }

 }else{
  this.offencesData = {

    isConvicted: '',
    convictionPlace: '',
    convictionReason: '',
    convictionTypeAndamount: '',
    isUnderInvestigation: '',
    investigationPlace: '',
    investigationAuthority: '',
    isExpelledOrDeported: '',
    expelledFrom: '',
    expelledOn: '',
    isEntryApplicationRejected: '',
    entryRejectedFrom: '',
    entyRejectedOn: '',
    isResidenceApplicationRejected: '',
    residenceRejectedFrom: '',
    residenceRejectedOn: ''
  }
 }
  }

  offenceNextClicked(){

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
}
