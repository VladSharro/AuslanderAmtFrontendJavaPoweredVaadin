import { Component } from '@angular/core';
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
    ],
  templateUrl: './residence-data.component.html',
  styleUrl: './residence-data.component.css'
})
export class ResidenceDataComponent {

  constructor(private applicationService: ApplicationService){}

  residence_labels = new PlaceOfResidenceSectionLabels();

  registrationFile: File | null = null;
  enrollmentCertificateFile: File | null = null


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
      console.log(2)

    }
  } 

  residenceNextButtonClicked(){
    this.applicationService.setResidenceData(this.residenceData.placeOfResidence, this.residenceData.isPreviousStays, this.residenceData.previousStayAddress, this.residenceData.dateFrom, this.residenceData.dateTo, this.residenceData.residenceAbroadIfRetained, this.residenceData.isResidenceAbroadRetained, this.registrationFile, this.enrollmentCertificateFile);
  }
}
