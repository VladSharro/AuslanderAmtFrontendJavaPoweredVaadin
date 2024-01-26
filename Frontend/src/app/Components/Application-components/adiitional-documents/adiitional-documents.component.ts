import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentModel } from '../../../Models/DocumentModel';
import { AdditionalDocumentsService } from '../../../Services/additional-documents.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { AdditionalDocumentsLabels } from '../../../Labels/additional-documents-labels';
import { ApplicationService } from '../../../Services/application.service';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adiitional-documents',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './adiitional-documents.component.html',
  styleUrl: './adiitional-documents.component.css'
})
export class AdiitionalDocumentsComponent {

  @ViewChild('hiddenButton') hiddenButton!: ElementRef;
  @Input() stepperReference!: MatStepper;

  isDataLoading = false;
  isSaveNeeded = false;

  noOfYears = 0
  noOfMonths = 0
  noOfDays = 0

  additionalDocumentsLabels = new AdditionalDocumentsLabels()
  constructor(private additionalDocumentsService: AdditionalDocumentsService, private applicationService: ApplicationService, private snackBarService: SnackBarService){     
    this.isDataLoading = true;  
    this.getAdditionalDocumentsData();
  }
  

  extractedDataChanged(){
    if(this.isSaveNeeded){   
      this.snackBarService.openNotSavedYetReminder();
    }
   }
  
  

  additionalDocs: DocumentModel[] = [];
  additionalDocsMap = new Map<string, File>();
  

  openDocumentInput(variableName: string){
    let elementId = "input-"+variableName;
    document.getElementById(elementId)?.click();

  }

  inputUploaded(event: any, variableName: string){
    const file = event.target.files[0];
    this._handleFileUpload(file, variableName);
  }

  _handleFileUpload(file: File, variableName: string){
    this.additionalDocsMap.set(variableName, file)
    this.extractedDataChanged()

    console.log(this.additionalDocsMap)
  }

  async getAdditionalDocumentsData(){
    this.additionalDocs = await this.additionalDocumentsService.getAdditionalDocuments()
    this.getDataFromUploaded()
    this.isDataLoading = false;
  }

  adiitionaDocumentsNextClicked(){
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

    this.applicationService.setAdditionalDocuments(this.additionalDocsMap, this.noOfYears, this.noOfMonths, this.noOfDays)
    this.snackBarService.openFor(WarningTypes.dataSaved)
  }

  getDataFromUploaded(){
    if(this.applicationService.getApplicationData().isContinue){
      this.additionalDocs.forEach((fileName) => {
        if(this.applicationService.tempAdditional.get(fileName.name)){
          this.additionalDocsMap.set(fileName.name, this.applicationService.tempAdditional.get(fileName.name)!)
        }
      })
    }
  }

}
