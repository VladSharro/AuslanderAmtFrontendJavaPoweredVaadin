import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FaqModel } from '../../../Models/FAQModel';
import { FaqService } from '../../../Services/faq.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-faq-screen',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './faq-screen.component.html',
  styleUrl: './faq-screen.component.css'
})
export class FaqScreenComponent implements AfterViewInit{
  isDataLoading = false;
  faqData: FaqModel[] = [];

  constructor(private faqService: FaqService, private cdr: ChangeDetectorRef){
    this.isDataLoading = true;
  }
  ngAfterViewInit(): void {
   this.getFaqData();
  }

  


  async getFaqData() {
    try {
      
      this.faqData = await this.faqService.getFAQ();
      this.isDataLoading = false;
    } catch (error) {
      // Handle the error, e.g., log it or show an error message to the user
      console.error('Error fetching FAQ data:', error);
    }
  }
 

  toggleAnswer(index: number){

    this.faqData[index].isOpened = !this.faqData[index].isOpened
    this.cdr.detectChanges();

  }

}
