import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportLabels } from '../../../Labels/financial_support_labels';
import { FinancialDocument } from '../../../Models/FinancialDocument';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ApplicationService } from '../../../Services/application.service';

@Component({
  selector: 'app-financial-support-data',
  standalone: true,
  imports: [CommonModule, MatStepperModule,
    MatRadioModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,],
  templateUrl: './financial-support-data.component.html',
  styleUrl: './financial-support-data.component.css'
})
export class FinancialSupportDataComponent {

  constructor(private applicationService: ApplicationService){}

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
    this.applicationService.setFinancialDocumentsData(this.meansOfSupportData.meansOfSupport, this.meansOfSupportData.isSecondOrTwelfth, this.meansOfSupportData.supportTyeIfYes, this.meansOfSupportData.isInsuranceAvailable, this.meansOfSupportData.insuranceCompany, this.meansOfSupportData.finalValueOfFinancialSupport, this.financialSupportFiles, this.insuranceFile)
  }
}
