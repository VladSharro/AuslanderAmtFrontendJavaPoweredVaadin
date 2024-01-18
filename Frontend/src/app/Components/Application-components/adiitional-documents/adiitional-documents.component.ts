import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentModel } from '../../../Models/DocumentModel';
import { AdditionalDocumentsService } from '../../../Services/additional-documents.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { AdditionalDocumentsLabels } from '../../../Labels/additional-documents-labels';
import { ApplicationService } from '../../../Services/application.service';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';

@Component({
  selector: 'app-adiitional-documents',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatStepperModule],
  templateUrl: './adiitional-documents.component.html',
  styleUrl: './adiitional-documents.component.css'
})
export class AdiitionalDocumentsComponent implements AfterViewInit{

  isDataLoading = false;
  isNextDisabled = true;

  additionalDocumentsLabels = new AdditionalDocumentsLabels
  constructor(private additionalDocumentsService: AdditionalDocumentsService, private applicationService: ApplicationService, private snackBarService: SnackBarService){     
    this.isDataLoading = true;  }
  ngAfterViewInit(): void {
    this.getAdditionalDocumentsData();

  }

  extractedDataChanged(){
    this.isNextDisabled = true
    this.snackBarService.openNotSavedYetReminder();
  
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
    this.isDataLoading = false;
  }

  adiitionaDocumentsNextClicked(){
    this.applicationService.setAdditionalDocuments(this.additionalDocsMap)
  }

  saveData(){

    this.applicationService.setAdditionalDocuments(this.additionalDocsMap)
    this.snackBarService.openFor(WarningTypes.dataSaved)
    this.isNextDisabled = false;
  }
}
