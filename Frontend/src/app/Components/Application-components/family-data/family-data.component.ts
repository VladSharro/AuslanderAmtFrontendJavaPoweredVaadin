import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { familyLabels } from '../../../Labels/Family_section_labels';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
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

  isDataLoading = false;
  isNextDisabled = true;

  constructor(private applicationService: ApplicationService, private snackBarService: SnackBarService){}
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
    this.isNextDisabled = true
    this.snackBarService.openNotSavedYetReminder();

   }


  saveData(){
    if(this.familyData.isChildrenAvailable === "Yes"){
      this.familyData.childern.push(new Child(this.childData))
    this.childData = new Child()
    }
    console.log(this.familyData)
    this.applicationService.setFamilyData(this.familyData.partnerLastName, this.familyData.partnerFirstName, this.familyData.partnerDateOfBirth, this.familyData.partnerPlaceOfBirth, this.familyData.partnerNationality, this.familyData.partnerSex, this.familyData.partnerCurrentResidenceInGermany, this.familyData.isChildrenAvailable, this.familyData.childern, this.familyData.isFatherApplicable, this.familyData.fatherLastName, this.familyData.fatherFisrtName, this.familyData.fatherNationality, this.familyData.fatherPlaceOfBirthForMinors, this.familyData.fatherDateOfBirthForMinors, this.familyData.fatherCurrentResidenceForMinors, this.familyData.isMotherApplicable, this.familyData.motherLastName, this.familyData.motherFisrtName, this.familyData.motherNationality, this.familyData.motherPlaceOfBirthForMinors, this.familyData.motherDateOfBirthForMinors, this.familyData.motherCurrentResidenceForMinors)
    this.snackBarService.openFor(WarningTypes.dataSaved)
    this.isNextDisabled = false;
 
  }

}
