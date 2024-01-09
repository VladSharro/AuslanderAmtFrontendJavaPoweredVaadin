import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { BasicDataLabels } from '../../../Labels/basic_data_labels';
import { ApplicationService } from '../../../Services/application.service';
import { OcrService } from '../../../Services/ocr.service';
import { passportResponse } from '../../../Models/apiResponseModels/Passport';

@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.css'
})
export class BasicDataComponent {

  constructor(private _formBuilder: FormBuilder, private applicationService: ApplicationService, private ocrService: OcrService) {}
  passportFile: File | null = null;

  isLoading = false

  basicData = {
    first_name: '',
    last_name: '',
    birth_date: '',
    sex_type: '',
    place_country: '',
    nationality: '',
    martial_type:'',
    since:'',
    eyes_color:'',
    height: 0,
    mobile:'',
    email:''
  };

  passportData = {
    passportNr: '',
    valid_from: '',
    valid_to: '',
    issued_by: '',
    issued_on: '',
  };

  
  basicDataLabels = new BasicDataLabels()

  sexOptions = [this.basicDataLabels.sex_options_m , this.basicDataLabels.sex_options_f, this.basicDataLabels.sex_options_d]
  martialOptions = [this.basicDataLabels.martial_options_single, this.basicDataLabels.martial_options_married, this.basicDataLabels.martial_options_registered, this.basicDataLabels.martial_options_divorced, this.basicDataLabels.martial_options_widowed, this.basicDataLabels.martial_options_seperated]
  eyesOptions = [this.basicDataLabels.blue_eyes_option, this.basicDataLabels.green_eyes_option, this.basicDataLabels.green_eyes_option, this.basicDataLabels.brown_eyes_option]
  
  openPassportInput(){ 
    // your can use ElementRef for this later
    const passportInput = document.getElementById("passportInput");

if (passportInput) {
  passportInput.click();
} else {
  console.error("File input element not found");
}

  }

  passportUploaded(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.passportFile = files[0];
      console.log(this.passportFile.name);
      this.extractData()
    }
  }

  private async extractData(){
    this.isLoading = true
    const extractedData = await this.ocrService.extractPassportData(this.passportFile!);
    this.updateData(extractedData)
  }

  private updateData(extractedData: passportResponse | never[]){
    this.isLoading = false;
    if (extractedData instanceof Array && extractedData.length === 0) {
      // Handle the case where it's an empty array (never[])
      console.error('Empty passport response array.');
      return;
    }else{
      const passportData = extractedData as passportResponse
      this.basicData.last_name = passportData.family_name
      this.basicData.first_name = passportData.first_name
      this.basicData.birth_date = passportData.date_of_birth
      this.basicData.nationality = passportData.nationality
      this.basicData.sex_type = passportData.sex
    }
    
  }

  basicDataNextButtonClicked(){
    console.log(this.basicData)
    this.applicationService.setBasicdata(this.basicData.first_name, this.basicData.last_name, this.basicData.birth_date, this.basicData.sex_type, this.basicData.place_country, this.basicData.nationality, this.basicData.martial_type, this.basicData.since, this.basicData.eyes_color, this.basicData.height, this.basicData.mobile, this.basicData.email)
    this.applicationService.setPassportData(this.passportData.passportNr, this.passportData.valid_from, this.passportData.valid_to, this.passportData.issued_by, this.passportData.issued_on, this.passportFile)
  }

  isPartnerDataNeeded(): boolean{
    if(this.basicData.martial_type === this.martialOptions[1] || this.basicData.martial_type === this.martialOptions[2]){
      return true;
    }
    else{
      return false;
    }
  }

  isSinceNeededForMartialStatue(): boolean{
    if(this.basicData.martial_type === this.martialOptions[3] || this.basicData.martial_type === this.martialOptions[4] || this.basicData.martial_type === this.martialOptions[5]){
      return true;
    }
    return false;
  }


 
}
