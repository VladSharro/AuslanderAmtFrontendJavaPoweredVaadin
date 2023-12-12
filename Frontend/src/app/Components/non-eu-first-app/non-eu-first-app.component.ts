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
import { PlaceOfResidenceSectionLabels } from '../../Labels/place_of_residence_section_labels';
import { familyLabels } from '../../Labels/Family_section_labels';
import { Child } from '../../Models/Child';
import { StayDataLabels } from '../../Labels/stay_data_labels';
import { SupportLabels } from '../../Labels/financial_support_labels';
import { offenciesLabels } from '../../Labels/offencies_data_labels';
import { FinancialDocument } from '../../Models/FinancialDocument';
import { PhotoLabels } from '../../Labels/Photo_labels';



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

  constructor() {}
  
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
  //////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////// passport section ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////


  fmailyLabels = new familyLabels();
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


  //////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////// Residence section ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////


  residence_labels = new PlaceOfResidenceSectionLabels();

  registrationFile: File | null = null;


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





  /////////////////////////////////////////////////////////////
  ///////////////////////Family Section ///////////////////////
  /////////////////////////////////////////////////////////////

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
    if(this.familyData.isFatherApplicable === "Yes"){
      if(this.basicData.birth_date === ''){
      const dateObject = new Date(this.basicData.birth_date);
      const year = dateObject.getFullYear();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      if(currentYear -  year < 19){
        return true
      } 
      }
    }
    return false;

  }

  isMinorWithMother(): boolean{
    if(this.familyData.isMotherApplicable === "Yes"){
      if(this.basicData.birth_date === ''){
      const dateObject = new Date(this.basicData.birth_date);
      const year = dateObject.getFullYear();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      if(currentYear -  year < 19){
        return true
      } 
      }
    }
    return false;

  }

  familyNextButtonClicked(){
    if(this.familyData.isChildrenAvailable === "Yes"){
      this.familyData.childern.push(new Child(this.childData))
    this.childData = new Child()
    }
    console.log(this.familyData)
  }




  ///////////////////////////////////////////////////////
  ///////////////////////STAY DATA///////////////////////
  ///////////////////////////////////////////////////////


  stayData = {
    lastEntryDate:'',
    lastEntryVisaType:'',
    visaIssueBy:'',
    visaIssueOn:'',
    visaNumber:'',
    visaValidFrom:'',
    visaValidTo:'',
    lengthOfStay:'',
    purposeOfStay:'',
  }

  visaFile: File | null = null;
  stayLabels = new StayDataLabels();
  lastEntryTypeOptions = [this.stayLabels.entry_visa_type_option_national, this.stayLabels.entry_visa_type_option_schegen, this.stayLabels.entry_visa_type_option_without, this.stayLabels.entry_visa_type_options_eu];
  stayPurposeOptions = [this.stayLabels.purpose_of_stay_option_training]


  openVisaInput(){ 
    // your can use ElementRef for this later
    const visaInput = document.getElementById("visaFileInput");

    if (visaInput) {
      visaInput.click();
    } else {
      console.error("File input element not found");
      }
  }

  


  visaUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.visaFile = files[0];
      console.log(this.visaFile.name);
      console.log(2)

    }
  }



  staySectionButtonClicked(){
    
  }



  ///////////////////////////////////////////////////////
  ///////////////////////SUPPORT DATA////////////////////
  ///////////////////////////////////////////////////////

  supportLabels = new SupportLabels();
  financialSupportFiles: FinancialDocument[] = [];
  insuranceFile: File | null = null;

  meansOfSupportData = {

    meansOfSupport: '',
    isSecondOrTwelfth: '',
    supportTyeIfYes: '',
    isInsuranceAvailable: '',
    insuranceCompany: '',
    finalValueOfFinancialSupport: 0,


  }

  yesNoOptions = [this.supportLabels.yes_option, this.supportLabels.no_option];
  codeOfSocialLawOptions = [this.supportLabels.social_benifit_option, this.supportLabels.basic_support_option];
  financialSupportOptions = [this.supportLabels.financial_support_option_blocked_account, this.supportLabels.financial_support_option_contract, this.supportLabels.financial_support_option_scholarship];

  tempFinancialSupportName = '';



  openInsuranceInput(){ 
    // your can use ElementRef for this later
    const insuranceInput = document.getElementById("insuranceFileInput");

    if (insuranceInput) {
      insuranceInput.click();
    } else {
      console.error("File input element not found");
      }
  }


  openFinancialSupportInput(index: number){
    const financialInput = document.getElementById("financialSupportInput"+String(index));
    if (financialInput) {
      financialInput.click();
    } else {
      console.error("financialSupportInput"+String(index));
      console.error("File input element not found");
      }
  }


  financialSupportUploaded(event: any, index: number){
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.financialSupportFiles[index].file = files[0];
      console.log(this.financialSupportFiles[index].file?.name);
      console.log(2)

    }
  }

  noOfDocsRange: number[] = [];


  insuranceUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.insuranceFile = files[0];
      console.log(this.insuranceFile.name);
      console.log(2)

    }
  }


  // ngOnChanges(): void {
  //   this.noOfDocsRange = Array.from({ length: this.meansOfSupportData.noOfFinancialSupportDocuments }, (_, index) => index + 1);
  // }


  addNewFinancialSupport(){
    this.financialSupportFiles.push(new FinancialDocument());
  }

  nextSupportClicked(){

  }


///////////////////////////////////////////////////////
///////////////////////OFFENCES DATA///////////////////
///////////////////////////////////////////////////////

offencesLabel = new offenciesLabels();

offencesData = {

  isConvicted: '',
  convictionPlace: '',
  convictionReason: '',
  convictionTypeAndamount: '',
  isUnderInvestigation: '',
  investigationPlace: '',
  investigationAuthority: '',
  isExpelledOrDeported: '',
  expelledFrom: '',
  expelledOn: '',
  isEntryApplicationRejected: '',
  entryRejectedFrom: '',
  entyRejectedOn: '',
  isResidenceApplicationRejected: '',
  residenceRejectedFrom: '',
  residenceRejectedOn: ''
}

placesOptions = [this.offencesLabel.inDeutschlandOption, this.offencesLabel.abroadOption];



///////////////////////////////////////////////////////
///////////////////////PHOTO DATA//////////////////////
///////////////////////////////////////////////////////


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

}
