import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { familyLabels } from '../../../Labels/Family_section_labels';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Child } from '../../../Models/Child';
import { ApplicationService } from '../../../Services/application.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';

@Component({
  selector: 'app-family-data',
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
    MatDatepickerModule,
    MatProgressSpinnerModule],
  templateUrl: './family-data.component.html',
  styleUrl: './family-data.component.css'
})
export class FamilyDataComponent {

  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;

  isDataLoading = false;
  isSaveNeeded = false;

  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){
    this.getDataFromUploaded()
  }

  fmailyLabels = new familyLabels();
  sexOptions = [this.fmailyLabels.sex_options_m , this.fmailyLabels.sex_options_f, this.fmailyLabels.sex_options_d]
  yesNoOptions = [this.fmailyLabels.yes_option, this.fmailyLabels.no_option];


  childData = new Child()

  familyData = {
    partnerLastName: '',
    partnerFirstName: '',
    partnerDateOfBirth: '',
    partnerPlaceOfBirth: '',
    partnerNationality: '',
    partnerSex: '',
    partnerCurrentResidenceInGermany:'',
    isChildrenAvailable: '',
    childern: [new Child()],
    isFatherApplicable: '',
    fatherLastName: '',
    fatherFisrtName: '',
    fatherNationality: '',
    fatherPlaceOfBirthForMinors: '',
    fatherDateOfBirthForMinors: '',
    fatherCurrentResidenceForMinors: '',
    isMotherApplicable: '',
    motherLastName: '',
    motherFisrtName: '',
    motherNationality: '',
    motherPlaceOfBirthForMinors: '',
    motherDateOfBirthForMinors: '',
    motherCurrentResidenceForMinors: '',


  }


  addChild(){
    this.familyData.childern.push(new Child(this.childData))
    this.childData = new Child()
    
  }

  isMinorWithFather(): boolean{
    if(this.familyData.isFatherApplicable == "Yes"){
      return this.applicationService.isMinorWithFather() ;
    }
    return false;

  }

  isMinorWithMother(): boolean{
    if(this.familyData.isMotherApplicable == "Yes"){
      return this.applicationService.isMinorWithMother();
    }
    return false;

  }


  isPartnerDataNeeded(): boolean{
    return this.applicationService.isPartnerDataNeeded();
  }

  extractedDataChanged(){
    if(this.isSaveNeeded){
      this.snackBarService.openNotSavedYetReminder();
    }
   }


  saveData(){
    if(this.familyData.isChildrenAvailable === "Yes"){
      this.familyData.childern.push(new Child(this.childData))
    this.childData = new Child()
    }
    this.applicationService.setFamilyData(this.familyData.partnerLastName, this.familyData.partnerFirstName, this.familyData.partnerDateOfBirth, this.familyData.partnerPlaceOfBirth, this.familyData.partnerNationality, this.familyData.partnerSex, this.familyData.partnerCurrentResidenceInGermany, this.familyData.isChildrenAvailable, this.familyData.childern, this.familyData.isFatherApplicable, this.familyData.fatherLastName, this.familyData.fatherFisrtName, this.familyData.fatherNationality, this.familyData.fatherPlaceOfBirthForMinors, this.familyData.fatherDateOfBirthForMinors, this.familyData.fatherCurrentResidenceForMinors, this.familyData.isMotherApplicable, this.familyData.motherLastName, this.familyData.motherFisrtName, this.familyData.motherNationality, this.familyData.motherPlaceOfBirthForMinors, this.familyData.motherDateOfBirthForMinors, this.familyData.motherCurrentResidenceForMinors)
    this.snackBarService.openFor(WarningTypes.dataSaved)
 
  }

  familtNextClicked(){
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


  getDataFromUploaded(){
    if(this.applicationService.getApplicationData().isContinue){
      const appData = this.applicationService.getApplicationData()
      this.familyData.partnerLastName = appData.partnerLastName
      this.familyData.partnerFirstName = appData.partnerFirstName
      this.familyData.partnerDateOfBirth = appData.partnerDateOfBirth
      this.familyData.partnerPlaceOfBirth = appData.partnerPlaceOfBirth
      this.familyData.partnerNationality = appData.partnerNationality
      this.familyData.partnerSex = appData.partnerSex
      this.familyData.partnerCurrentResidenceInGermany = appData.partnerCurrentResidenceInGermany
      this.familyData.isChildrenAvailable = appData.isChildrenAvailable
      this.familyData.childern = appData.childern
      this.familyData.isFatherApplicable = appData.isFatherApplicable
      this.familyData.fatherLastName = appData.fatherLastName
      this.familyData.fatherFisrtName = appData.fatherFisrtName
      this.familyData.fatherNationality = appData.fatherNationality
      this.familyData.fatherPlaceOfBirthForMinors = appData.fatherPlaceOfBirthForMinors
      this.familyData.fatherDateOfBirthForMinors = appData.fatherDateOfBirthForMinors
      this.familyData.fatherCurrentResidenceForMinors = appData.fatherCurrentResidenceForMinors
      this.familyData.isMotherApplicable = appData.isMotherApplicable
      this.familyData.motherLastName = appData.motherLastName
      this.familyData.motherFisrtName = appData.motherFisrtName
      this.familyData.motherNationality = appData.motherNationality
      this.familyData.motherPlaceOfBirthForMinors = appData.motherPlaceOfBirthForMinors
      this.familyData.motherDateOfBirthForMinors = appData.motherDateOfBirthForMinors
      this.familyData.motherCurrentResidenceForMinors = appData.motherCurrentResidenceForMinors

    }else{

      this.familyData = {
        
        partnerLastName: '',
        partnerFirstName: '',
        partnerDateOfBirth: '',
        partnerPlaceOfBirth: '',
        partnerNationality: '',
        partnerSex: '',
        partnerCurrentResidenceInGermany:'',
        isChildrenAvailable: '',
        childern: [new Child()],
        isFatherApplicable: '',
        fatherLastName: '',
        fatherFisrtName: '',
        fatherNationality: '',
        fatherPlaceOfBirthForMinors: '',
        fatherDateOfBirthForMinors: '',
        fatherCurrentResidenceForMinors: '',
        isMotherApplicable: '',
        motherLastName: '',
        motherFisrtName: '',
        motherNationality: '',
        motherPlaceOfBirthForMinors: '',
        motherDateOfBirthForMinors: '',
        motherCurrentResidenceForMinors: '',
    
    
      }
    }
  }

}
