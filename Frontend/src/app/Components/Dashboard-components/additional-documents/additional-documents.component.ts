import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DocumentModel } from '../../../Models/DocumentModel';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgZone, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalDocumentsService } from '../../../Services/additional-documents.service';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-additional-documents',
  standalone: true,
  imports: [CommonModule,FormsModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './additional-documents.component.html',
  styleUrl: './additional-documents.component.css'
})
export class AdditionalDocumentsComponent {

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(private documentsService: AdditionalDocumentsService, private _ngZone: NgZone, private _snackBar: MatSnackBar){}

  newDoc = '';
  newDesc = '';
  isNewApplication = false;
  isRenewApplication = false;

  isDataLoading = false;
  isDocAdded = false;
  documentsData: DocumentModel[] = [];
  isNewDoc = true;

  pagedDocumentsData: DocumentModel[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 1;


  

  async ShowAllDocs(){
    this.isNewDoc = false;
    this.isDataLoading = true;
    this.documentsData = await this.documentsService.getAdditionalDocuments();
    this.updatePagedData();
    this.isDataLoading = false;
    
  }
  async AddDoc(){

    this.isNewDoc = true;
    
  }
  

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.updatePagedData();
  }

  onPageSizeChange(event: any){
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  private updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDocumentsData = this.documentsData.slice(startIndex, endIndex);
    console.log(this.pagedDocumentsData)
  }

  async removeDoc(index: number){
    this.isDataLoading = true;
    this.documentsService.deleteAdditionalDocument(this.pagedDocumentsData[index].id!);
    this.isDataLoading = false;
    this.ShowAllDocs()
  }

  async saveDoc(){
    this.isDataLoading = true;
    if(this.newDoc != '' && this.newDesc != ''){
      this.isDocAdded = await this.documentsService.addToAdditionalDocuments(new DocumentModel(this.newDoc, this.newDesc, undefined,this.isNewApplication, this.isRenewApplication));
    }
    if(this.isDocAdded){
      this.newDoc = '';
      this.newDesc = '';
      this.isNewApplication = false;
      this.isRenewApplication = false;
      this.openSnackBar();
    }
    this.isDataLoading = false;
  }



  openSnackBar() {
    this._snackBar.open("Document added successfully", "dismiss", {
      duration: 5 * 1000,
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize!.resizeToFitContent(true));
  }
}
