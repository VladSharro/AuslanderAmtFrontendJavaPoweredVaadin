import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StayDataLabels } from '../../../Labels/stay_data_labels';
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
  selector: 'app-stay-renewal-data',
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
  templateUrl: './stay-data-renewal.component.html',
  styleUrl: './stay-data-renewal.component.css'
})
export class StayDataRenewalComponent {

  isNextDisabled = true;

  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){
    this.getDataFromUploaded()

  }

  stayData = {
    purpose_of_stay_germany:'',
    purpose_changed_explaination:''
  }

  // visaFile: File | null = null;
  stayLabels = new StayDataLabels();
  yesNoOptions = [this.stayLabels.option_yes, this.stayLabels.option_No];
  

  saveData(){

    this.applicationService.setStayRenewalData(this.stayData.purpose_of_stay_germany, this.stayData.purpose_changed_explaination)
    this.snackBarService.openFor(WarningTypes.dataSaved)
    this.isNextDisabled = false;
  }

  extractedDataChanged(){
    this.isNextDisabled = true
    this.snackBarService.openNotSavedYetReminder();

   }


  staySectionButtonClicked(){

    
  }

  getDataFromUploaded(){
      if(this.applicationService.getApplicationData().isContinue){
        const appData = this.applicationService.getApplicationData()
        this.stayData = {
          purpose_of_stay_germany: appData.purposeOfStay,
          purpose_changed_explaination: appData.PurposeChanged
        }
      }else{
        this.stayData = {
          purpose_of_stay_germany:'',
          purpose_changed_explaination:''
        }
      }
  }
}
