import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DocumentModel } from '../../../Models/DocumentModel';
import { DocumetsService } from '../../../Services/documets.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../Fixed_components/header/header.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule,  MatProgressSpinnerModule, MatCardModule, MatDividerModule, MatIconModule, HeaderComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements AfterViewInit{

  isDataLoading = false;
  documentsData: DocumentModel[] = [];

  constructor(private documentsService: DocumetsService) {
  
    this.isDataLoading = true;
  }
  
  ngAfterViewInit(): void {
    this.getFaqData();
  }
  
  async getFaqData() {
    try {
      this.documentsData = await this.documentsService.getDocuments();
      
      this.isDataLoading = false;
    } catch (error) {
      console.error('Error fetching documents data:', error);
    }
  }
 

  toggleAnswer(index: number){

    this.documentsData[index].isOpened = !this.documentsData[index].isOpened

  }
}
