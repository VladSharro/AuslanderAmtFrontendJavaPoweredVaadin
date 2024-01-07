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

  constructor(private applicationService: ApplicationService){}

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

  


  visaUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.visaFile = files[0];
      console.log(this.visaFile.name);
      console.log(2)

    }
  }



  staySectionButtonClicked(){

    this.applicationService.setStayData(this.stayData.lastEntryDate,this.stayData.lastEntryVisaType, this.stayData.visaIssueBy, this.stayData.visaIssueOn ,this.stayData.visaNumber, this.stayData.visaValidFrom, this.stayData.visaValidTo, this.stayData.lengthOfStay, this.stayData.purposeOfStay, this.visaFile)
    
  }
}
