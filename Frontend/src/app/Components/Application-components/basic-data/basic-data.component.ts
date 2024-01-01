import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { BasicDataLabels } from '../../../Labels/basic_data_labels';

@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.css'
})
export class BasicDataComponent {

  constructor(private _formBuilder: FormBuilder) {}
  passportFile: File | null = null;

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
      console.log(1)
    }
  }

  basicDataNextButtonClicked(){
    console.log(this.basicData)
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
