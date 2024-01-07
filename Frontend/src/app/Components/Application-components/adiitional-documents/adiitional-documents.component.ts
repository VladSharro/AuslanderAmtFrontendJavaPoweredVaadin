import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentModel } from '../../../Models/DocumentModel';
import { AdditionalDocumentsService } from '../../../Services/additional-documents.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { AdditionalDocumentsLabels } from '../../../Labels/additional-documents-labels';
import { ApplicationService } from '../../../Services/application.service';

@Component({
  selector: 'app-adiitional-documents',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatStepperModule],
  templateUrl: './adiitional-documents.component.html',
  styleUrl: './adiitional-documents.component.css'
})
export class AdiitionalDocumentsComponent implements AfterViewInit{

  
  additionalDocumentsLabels = new AdditionalDocumentsLabels
  constructor(private additionalDocumentsService: AdditionalDocumentsService, private applicationService: ApplicationService){     this.isDataLoading = true;  }
  ngAfterViewInit(): void {
    this.getAdditionalDocumentsData();

  }

  isDataLoading = false;
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
    console.log(this.additionalDocsMap)
  }

  async getAdditionalDocumentsData(){
    this.additionalDocs = await this.additionalDocumentsService.getAdditionalDocuments()
    this.isDataLoading = false;
  }

  adiitionaDocumentsNextClicked(){
    this.applicationService.setAdditionalDocuments(this.additionalDocsMap)
  }
}
