import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { BasicDataLabels } from '../../Labels/basic_data_labels';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';






@Component({
  selector: 'app-non-eu-first-app',
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
    MatDatepickerModule
  ],
  templateUrl: './non-eu-first-app.component.html',
  styleUrl: './non-eu-first-app.component.css'
})


export class NonEuFirstAppComponent {

  passportFile: File | null = null;
  

  //

  constructor() {

  
  }
  
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

  
  basicDataLabels = new BasicDataLabels()

  sexOptions = [this.basicDataLabels.sex_options_m , this.basicDataLabels.sex_options_f, this.basicDataLabels.sex_options_d]
  martialOptions = [this.basicDataLabels.martial_options_single, this.basicDataLabels.martial_options_married, this.basicDataLabels.martial_options_registered, this.basicDataLabels.martial_options_divorced, this.basicDataLabels.martial_options_widowed, this.basicDataLabels.martial_options_seperated]
  eyesOptions = [this.basicDataLabels.blue_eyes_option, this.basicDataLabels.green_eyes_option, this.basicDataLabels.green_eyes_option, this.basicDataLabels.brown_eyes_option]
  openInput(){ 
    // your can use ElementRef for this later
    const fileInput = document.getElementById("fileInput");

if (fileInput) {
  fileInput.click();
} else {
  console.error("File input element not found");
}

  }

  passportUploaded(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.passportFile = files[0];
      console.log(this.passportFile.name);
    }
  }

  basicDataNextButtonClicked(){
    console.log(this.basicData)
  }


  isSinceNeededForMartialStatue(): boolean{
    if(this.basicData.martial_type === this.martialOptions[3] || this.basicData.martial_type === this.martialOptions[4] || this.basicData.martial_type === this.martialOptions[5]){
      return true;
    }
    return false;
  }





  ///////////////////////////////////////////////// passport section////////////////////////////

  passportData = {
    passportNr: '',
    valid_from: '',
    valid_to: '',
    issued_by: '',
    issued_on: '',
  };


  passportNextButtonClicked(){
    console.log(this.passportData)
  }




}
