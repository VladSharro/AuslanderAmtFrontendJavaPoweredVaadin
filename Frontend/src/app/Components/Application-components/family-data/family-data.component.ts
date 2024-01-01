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
    MatDatepickerModule,],
  templateUrl: './family-data.component.html',
  styleUrl: './family-data.component.css'
})
export class FamilyDataComponent {
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
    // if(this.familyData.isFatherApplicable === "Yes"){
    //   if(this.basicData.birth_date === ''){
    //   const dateObject = new Date(this.basicData.birth_date);
    //   const year = dateObject.getFullYear();
    //   const currentDate = new Date();
    //   const currentYear = currentDate.getFullYear();

    //   if(currentYear -  year < 19){
    //     return true
    //   } 
    //   }
    // }
    return false;

  }

  isMinorWithMother(): boolean{
    // if(this.familyData.isMotherApplicable === "Yes"){
    //   if(this.basicData.birth_date === ''){
    //   const dateObject = new Date(this.basicData.birth_date);
    //   const year = dateObject.getFullYear();
    //   const currentDate = new Date();
    //   const currentYear = currentDate.getFullYear();

    //   if(currentYear -  year < 19){
    //     return true
    //   } 
    //   }
    // }
    return false;

  }


  isPartnerDataNeeded(): boolean{
    // if(this.basicData.martial_type === this.martialOptions[1] || this.basicData.martial_type === this.martialOptions[2]){
    //   return true;
    // }
    // else{
      return false;
    // }
  }


  familyNextButtonClicked(){
    if(this.familyData.isChildrenAvailable === "Yes"){
      this.familyData.childern.push(new Child(this.childData))
    this.childData = new Child()
    }
    console.log(this.familyData)
  }

}
