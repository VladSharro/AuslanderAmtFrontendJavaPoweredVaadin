import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { offenciesLabels } from '../../../Labels/offencies_data_labels';
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

  isDataLoading = false;
  isNextDisabled = true;


  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){}

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


nextOffencesClicked(){
  
}

saveData(){

  this.applicationService.setOffenceData(this.offencesData.isConvicted, this.offencesData.convictionPlace, this.offencesData.convictionReason, this.offencesData.convictionTypeAndamount, this.offencesData.isUnderInvestigation, this.offencesData.investigationPlace, this.offencesData.investigationAuthority, this.offencesData.isExpelledOrDeported, this.offencesData.expelledFrom, this.offencesData.expelledOn, this.offencesData.isEntryApplicationRejected, this.offencesData.entryRejectedFrom, this.offencesData.entyRejectedOn, this.offencesData.isResidenceApplicationRejected, this.offencesData.residenceRejectedFrom, this.offencesData.residenceRejectedOn)
  this.snackBarService.openFor(WarningTypes.dataSaved)
  this.isNextDisabled = false;
}


extractedDataChanged(){
  this.isNextDisabled = true
  this.snackBarService.openNotSavedYetReminder();

 }



}
