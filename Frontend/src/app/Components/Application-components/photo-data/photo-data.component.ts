import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PhotoLabels } from '../../../Labels/Photo_labels';

@Component({
  selector: 'app-photo-data',
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
  templateUrl: './photo-data.component.html',
  styleUrl: './photo-data.component.css'
})
export class PhotoDataComponent {

  photoLabels = new PhotoLabels();

photoFile: File |  null = null;



openPhotoInput(){ 
  // your can use ElementRef for this later
  const photoInput = document.getElementById("photoFileInput");

  if (photoInput) {
    photoInput.click();
  } else {
    console.error("File input element not found");
    }
}




photoUpload(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    this.photoFile = files[0];
    console.log(this.photoFile.name);
    console.log(2)

  }
}

photoNextClicked(){}

}
