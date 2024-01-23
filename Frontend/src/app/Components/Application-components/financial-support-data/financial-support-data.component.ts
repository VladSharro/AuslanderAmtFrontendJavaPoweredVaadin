import { Component, EventEmitter, Output } from '@angular/core';
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
import { financialdocumentResponse } from '../../../Models/apiResponseModels/financialdocumentResponse';
import { healthinsuranceResponse } from '../../../Models/apiResponseModels/healthinsuranceResponse';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WarningTypes } from '../../../Models/enums/warningEnum';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OcrService } from '../../../Services/ocr.service';

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
    MatDatepickerModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule],
  templateUrl: './financial-support-data.component.html',
  styleUrl: './financial-support-data.component.css'
})
export class FinancialSupportDataComponent {


  @Output() fifthStepperValidityChange = new EventEmitter<boolean>();


  constructor(private applicationService: ApplicationService, private ocrService: OcrService, private snackBarService: SnackBarService){
    this.getDataFromUploaded()

  }

  supportLabels = new SupportLabels();
  financialSupportFiles: FinancialDocument[] = [];
  insuranceFile: File | null = null;

  isNextDisabled = true;
  isDataLoading = false;

  isOverWritten = false;
  isNextAllowed = false;
  nextAccepted = false;


  isOverwriteSlideOn = false;

  insuranceExtractedData: healthinsuranceResponse | undefined;
  financialExtractedData: financialdocumentResponse | undefined;


  meansOfSupportData = {

    meansOfSupport: '',
    isSecondOrTwelfth: '',
    supportTyeIfYes: '',
    isInsuranceAvailable: '',
    insuranceCompany: '',
    finalValueOfFinancialSupport: 0,
    noOfMonths: 0,
    date_of_expiry: ''

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
    this.extractedDataChanged()
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Financial document
      this.financialSupportFiles[index].file = files[0];
      console.log(this.financialSupportFiles[index].file?.name);
      this.extractFinancialData(index)
    }
  }

  private async extractFinancialData(index: number){
    this.isDataLoading = true
    const extractedData = await this.ocrService.extractFinancialDocuemntCertificatetData(this.financialSupportFiles[index].file!);
    this.isDataLoading = false;
    if(extractedData != null){
      this.updateFinancialData(extractedData)
    }else{
      this.snackBarService.openFor(WarningTypes.ExtractFailed)
    }  }

  private updateFinancialData(extractedData: financialdocumentResponse | never[]){
    // this.isDataLoading = false;
    if (extractedData instanceof Array && extractedData.length === 0) {
      // Handle the case where it's an empty array (never[])
      console.error('Empty passport response array.');
      return;
    }else{
      const financialData = extractedData as financialdocumentResponse
      this.meansOfSupportData.finalValueOfFinancialSupport += Number(financialData.sum)
      if(this.meansOfSupportData.noOfMonths == 0){
        this.meansOfSupportData.noOfMonths = Number(financialData.date)
      }else{
        this.meansOfSupportData.noOfMonths = Math.max(this.meansOfSupportData.noOfMonths, Number(financialData.date))
      }
      console.log(this.financialExtractedData);
      
      if(this.financialExtractedData != undefined){
        this.financialExtractedData.sum += financialData.sum
      } else{
        this.financialExtractedData = financialData
      }   
      this.financialExtractedData.date = String(this.meansOfSupportData.noOfMonths)
      console.log(this.financialExtractedData);
 
       //this.meansOfSupportData.n = this.get_date(financialData.date)
    }
    
  }

  overWriteChanged(event: any){
    if(event.checked){
      this.isOverwriteSlideOn = true
      this.isOverWritten = true
      this.isNextAllowed = true
      this.fifthStepperValidityChange.emit(true);

    }else{
      this.isOverwriteSlideOn = false;
      this.isOverWritten = false
      this.isNextAllowed = false
    }
  }

  insuranceUpload(event: any) {
    this.extractedDataChanged()
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.insuranceFile = files[0];
      console.log(this.insuranceFile.name);
      this.extractInsuranceData()
    }
  }

private async extractInsuranceData(){
    this.isDataLoading = true
    const insuracneData = await this.ocrService.extractInsuranceCertificatetData(this.insuranceFile!);
    this.isDataLoading = false
    if(insuracneData != null){
      this.updateInsuranceData(insuracneData)
    }else{
      this.snackBarService.openFor(WarningTypes.ExtractFailed)
    }  }

  saveData(){

    this.isOverWritten= false
    this.nextAccepted = false
    this.applicationService.setFinancialDocumentsData(this.meansOfSupportData.meansOfSupport, this.meansOfSupportData.isSecondOrTwelfth, this.meansOfSupportData.supportTyeIfYes, this.meansOfSupportData.isInsuranceAvailable, this.meansOfSupportData.insuranceCompany, this.meansOfSupportData.date_of_expiry, this.meansOfSupportData.finalValueOfFinancialSupport, this.financialSupportFiles, this.meansOfSupportData.noOfMonths, this.insuranceFile)
    this.checkIfNext();
    this.snackBarService.openFor(WarningTypes.dataSaved)
    this.isNextDisabled = false
  }


    checkIfNext(){
      if(this.isNextAllowed){
  
        this.fifthStepperValidityChange.emit(true);
        return
      }
  
      this.isOverWritten = this.checkIfDataOverwritten();
     console.log(this.isOverWritten)
      if(this.isOverWritten == false){
        this.nextAccepted = true;
      }else{
        if(this.isNextAllowed){
        this.nextAccepted = true
        }
      } 
    if(!this.nextAccepted){
      console.log(1)
  
      console.log(this.nextAccepted)
      this.fifthStepperValidityChange.emit(this.nextAccepted);
  
    }else{
      console.log(2)
  
      console.log(this.nextAccepted)
  
      this.fifthStepperValidityChange.emit(this.nextAccepted);
    }
     
  }

  checkIfDataOverwritten(){
    if(this.insuranceExtractedData != undefined || this.financialExtractedData != undefined){
    if(this.meansOfSupportData.insuranceCompany == this.insuranceExtractedData?.insurer){
      if(this.meansOfSupportData.date_of_expiry == this.insuranceExtractedData?.date_of_expire){
        console.log("Number of months:  "+ this.financialExtractedData?.date)
        if( this.meansOfSupportData.noOfMonths == Number(this.financialExtractedData?.date)){
          if(this.meansOfSupportData.finalValueOfFinancialSupport == Number(this.financialExtractedData?.sum)){
            console.log("isDataOverwrite value is" + false)

              return false;

            
          }
        }
      }
    }
    }
    console.log("isDataOverwrite value is" + true)
    return true;
  }


  extractedDataChanged(){
    this.fifthStepperValidityChange.emit(false);
    this.isNextDisabled = true
    this.snackBarService.openNotSavedYetReminder();

   }

  private updateInsuranceData(extractedData: healthinsuranceResponse | never[]){
    // this.isDataLoading = false;
    if (extractedData instanceof Array && extractedData.length === 0) {
      // Handle the case where it's an empty array (never[])
      console.error('Empty Insurance response array.');
      return;
    }else{
      const insuranceData = extractedData as healthinsuranceResponse
      // this.meansOfSupportData. = insuranceData. 
      this.meansOfSupportData.insuranceCompany = insuranceData.insurer
      this.meansOfSupportData.date_of_expiry = this.get_date(insuranceData.date_of_expire)     
    }
    
  }

  get_date(validitydate: string):string{
    return new Date(validitydate).toISOString().slice(0, 10)
  }

  noOfDocsRange: number[] = [];


  addNewFinancialSupport(){
    this.financialSupportFiles.push(new FinancialDocument());
  }

  nextSupportClicked(){
    if(!this.nextAccepted){
      if(!this.isNextAllowed){

        this.snackBarService.openFor(WarningTypes.confirmNeeded);
      }
    }
    // this.nextAccepted = false;
    this.isNextDisabled = true;
  }

  getDataFromUploaded(){
    if(this.applicationService.getApplicationData().isContinue){
      const appData = this.applicationService.getApplicationData()
      this.meansOfSupportData = {

        meansOfSupport: appData.meansOfSupport,
        isSecondOrTwelfth: appData.isSecondOrTwelfth,
        supportTyeIfYes: appData.supportTyeIfYes,
        isInsuranceAvailable: appData.isInsuranceAvailable,
        insuranceCompany: appData.insuranceCompany,
        finalValueOfFinancialSupport: appData.finalValueOfFinancialSupport,
        noOfMonths: appData.noOfMonths,
        date_of_expiry: appData.insuranceExpiryDate
    
      }
      this.financialSupportFiles = this.applicationService.tempFinancial;
      this.insuranceFile = this.applicationService.tempInsurance
  }else{
    this.meansOfSupportData = {

      meansOfSupport: '',
      isSecondOrTwelfth: '',
      supportTyeIfYes: '',
      isInsuranceAvailable: '',
      insuranceCompany: '',
      finalValueOfFinancialSupport: 0,
      noOfMonths: 0,
      date_of_expiry: ''
  
    }
    this.financialSupportFiles = []
    this.insuranceFile = null
  }
}
}
