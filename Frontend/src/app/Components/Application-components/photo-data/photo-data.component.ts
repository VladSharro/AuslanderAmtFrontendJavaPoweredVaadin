import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PhotoLabels } from '../../../Labels/Photo_labels';
import { ApplicationService } from '../../../Services/application.service';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';

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

  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;

  isDataLoading = false;
  isSaveNeeded = false;
  
constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){    
  this.getDataFromUploaded()
}

photoLabels = new PhotoLabels();

photoFile: File |  null = null;
signFile: File | null = null;



openPhotoInput(){ 
  // your can use ElementRef for this later
  const photoInput = document.getElementById("photoFileInput");

  if (photoInput) {
    photoInput.click();
  } else {
    console.error("File input element not found");
    }
}




signUpload(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    this.signFile = files[0];
    console.log(this.signFile.name);
    this.extractedDataChanged()

  }
}

openSignInput(){ 
  // your can use ElementRef for this later
  const signInput = document.getElementById("signFileInput");

  if (signInput) {
    signInput.click();
  } else {
    console.error("File input element not found");
    }
}




photoUpload(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    this.photoFile = files[0];
    console.log(this.photoFile.name);
    this.extractedDataChanged()

  }
}

photoNextClicked(){
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

saveData(){

  this.applicationService.setPhotoData(this.photoFile, this.signFile);
  this.snackBarService.openFor(WarningTypes.dataSaved)
}

extractedDataChanged(){
  if(this.isSaveNeeded){   
    this.snackBarService.openNotSavedYetReminder();
  }

 }

 getDataFromUploaded(){
  if(this.applicationService.getApplicationData().isContinue){
    this.photoFile = this.applicationService.tempPhoto
    this.signFile = this.applicationService.tempSignature    

 }else{
  this.photoFile = null
  this.signFile = null
 }
 }
}
