import { Component, EventEmitter, Inject, Output, AfterViewChecked, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStep, MatStepper, MatStepperModule} from '@angular/material/stepper';
import { BasicDataLabels } from '../../../Labels/basic_data_labels';
import { ApplicationService } from '../../../Services/application.service';
import { passportResponse } from '../../../Models/apiResponseModels/Passport';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WarningTypes } from '../../../Models/enums/warningEnum';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { OcrService } from '../../../Services/ocr.service';


@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule , MatStepperModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatSlideToggleModule],
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.css'
})
export class BasicDataComponent {

  // @Output() firstStepperValidityChange = new EventEmitter<boolean>();
  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;




  constructor(private _formBuilder: FormBuilder,private snackBarService: SnackBarService ,private applicationService: ApplicationService, private ocrService: OcrService, private _snackBar: MatSnackBar) {
    this.getDataFromUploaded()
  }
  
 
  passportFile: File | null = null
  isDataLoading = false;

  isSaveNeeded = false

  isChangesConfirmed = true
  isExtracted = false;
  



  passportExtractedData: passportResponse | undefined;

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
    this.isDataLoading = true
    const extractedData = await this.ocrService.extractPassportData(this.passportFile!);
    this.isExtracted = true;

    this.isDataLoading = false
    if(extractedData != null){
      this.updateData(extractedData)
    }else{
      this.snackBarService.openFor(WarningTypes.fileError)
    }
  }

  private updateData(extractedData: passportResponse | never[]){

    if (extractedData instanceof Array && extractedData.length === 0) {
      // Handle the case where it's an empty array (never[])
      this.snackBarService.openFor(WarningTypes.fileError)
      return;
    }else{
      const passportData = extractedData as passportResponse
      this.basicData.last_name = passportData.family_name
      this.basicData.first_name = passportData.first_name
      this.basicData.birth_date = this.get_date(passportData.date_of_birth)
      this.basicData.nationality = passportData.nationality
      this.basicData.sex_type = passportData.sex


      this.passportExtractedData =passportData
      this.passportExtractedData.date_of_birth = this.get_date(passportData.date_of_birth)
      console.log(this.passportExtractedData)     
    }
    
  }

  get_date(datebirth: string):string{
    
    return new Date(datebirth).toISOString().slice(0, 10)
  }

  basicDataNextButtonClicked(){
    if(this.checkIfDataOverwritten()){
      if(this.isChangesConfirmed == true){
        this.nextAccepted()
      }else{
        this.snackBarService.openFor(WarningTypes.confirmNeeded)
      }
  }else{
    this.nextAccepted()
  }

  }

  nextAccepted(){
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


  overWriteChanged(event: any){
    if(event.checked){
      this.isChangesConfirmed = false;

    }else{
      this.isChangesConfirmed = true;

    }
  }

  
  
  checkIfDataOverwritten(){
    if(this.isExtracted){
      if(this.passportExtractedData != undefined){
        if(this.basicData.last_name == this.passportExtractedData?.family_name){
          if(this.basicData.first_name == this.passportExtractedData?.first_name){
            if(this.basicData.nationality == this.passportExtractedData?.nationality){
              if(this.basicData.sex_type == this.passportExtractedData?.sex){
                if(this.basicData.birth_date == this.passportExtractedData.date_of_birth){
                  return false;
              }
            }
          }
        }
      }
    }
    return true;
  }
  return true
    
  }


  


   extractedDataChanged(){
    if(this.isSaveNeeded){
      this.snackBarService.openNotSavedYetReminder();
    }

   }
 


   

  saveData(){
   
    // this.isNextAllowed = false

    this.applicationService.setBasicdata(this.basicData.first_name, this.basicData.last_name, this.basicData.birth_date, this.basicData.sex_type, this.basicData.place_country, this.basicData.nationality, this.basicData.martial_type, this.basicData.since, this.basicData.eyes_color, this.basicData.height, this.basicData.mobile, this.basicData.email)
    this.applicationService.setPassportData(this.passportData.passportNr, this.passportData.valid_from, this.passportData.valid_to, this.passportData.issued_by, this.passportData.issued_on, this.passportFile)
    // this.checkIfNext();
    this.snackBarService.openFor(WarningTypes.dataSaved)
  }


   getDataFromUploaded(){

    if(this.applicationService.getApplicationData().isContinue){
      const appData = this.applicationService.getApplicationData()
      this.basicData.first_name = appData.first_name
      this.basicData.last_name = appData.last_name
      this.basicData.birth_date = appData.birth_date
      this.basicData.place_country = appData.place_country
      this.basicData.sex_type = appData.sex_type
      this.basicData.nationality = appData.nationality
      this.basicData.martial_type = appData.martial_type
      this.basicData.email = appData.email
      this.basicData.eyes_color = appData.eyes_color
      this.basicData.height = appData.height
      this.basicData.mobile = appData.mobile
      this.basicData.since = appData.since
      this.passportData.issued_by = appData.issued_by
      this.passportData.issued_on = appData.issued_on
      this.passportData.passportNr = appData.passportNr
      this.passportData.valid_from = appData.valid_from
      this.passportData.valid_to = appData.valid_to
      this.passportFile = this.applicationService.tempPassportFile
     // console.log("application: "+await this.applicationService.getApplicationPassport().then)


    }else{
      this.basicData.first_name = ''
      this.basicData.last_name = ''
      this.basicData.birth_date = ''
      this.basicData.place_country = ''
      this.basicData.sex_type = ''
      this.basicData.nationality = ''
      this.basicData.martial_type = ''
      this.basicData.email = ''
      this.basicData.eyes_color = ''
      this.basicData.height = 0
      this.basicData.mobile = ''
      this.basicData.since = ''
      this.passportData.issued_by = ''
      this.passportData.issued_on = ''
      this.passportData.passportNr = ''
      this.passportData.valid_from = ''
      this.passportData.valid_to = ''
      this.passportFile = null
    }


  }

  gotoNext(){
    const buttonElement: HTMLButtonElement = this.hiddenButton.nativeElement;
    buttonElement.click();
  }
}
