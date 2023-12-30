import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FaqModel } from '../../../Models/FAQModel';
import { FaqService } from '../../../Services/faq.service';
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
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-faq-component',
  standalone: true,
  imports: [CommonModule,FormsModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './faq-component.component.html',
  styleUrl: './faq-component.component.css'
})
export class FaqComponentComponent{
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(private faqService: FaqService, private _ngZone: NgZone, private _snackBar: MatSnackBar){}

  newQuestion = '';
  newAnswer = '';

  isDataLoading = false;
  isFaqAdded = false;
  faqData: FaqModel[] = [];
  isNewFaq = true;

  pagedFaqData: FaqModel[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 1;


  

  async ShowAllFAQ(){
    this.isNewFaq = false;
    this.isDataLoading = true;
    this.faqData = await this.faqService.getFAQ();
    this.updatePagedData();
    this.isDataLoading = false;
    
  }
  async AddFAQ(){

    this.isNewFaq = true;
    
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
    this.pagedFaqData = this.faqData.slice(startIndex, endIndex);
    console.log(this.pagedFaqData)
  }

  async removeFaq(index: number){
    this.isDataLoading = true;
    this.faqService.deleteFaq(this.pagedFaqData[index].id!);
    this.isDataLoading = false;
    this.ShowAllFAQ()
  }

  async saveFAQ(){
    this.isDataLoading = true;
    if(this.newQuestion != '' && this.newAnswer != ''){
      this.isFaqAdded = await this.faqService.addToFAQ(new FaqModel(this.newQuestion, this.newAnswer));
    }
    if(this.isFaqAdded){
      this.newQuestion = '';
      this.newAnswer = '';
      this.openSnackBar();
    }
    this.isDataLoading = false;
  }



  openSnackBar() {
    this._snackBar.open("FAQ added successfully", "dismiss", {
      duration: 100 * 1000,
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize!.resizeToFitContent(true));
  }

}

