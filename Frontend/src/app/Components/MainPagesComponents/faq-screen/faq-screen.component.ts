import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FaqModel } from '../../../Models/FAQModel';
import { FaqService } from '../../../Services/faq.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../Fixed_components/header/header.component';



@Component({
  selector: 'app-faq-screen',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatDividerModule, MatIconModule, HeaderComponent],
  templateUrl: './faq-screen.component.html',
  styleUrl: './faq-screen.component.css'
})
export class FaqScreenComponent implements AfterViewInit{
  isDataLoading = false;
  faqData: FaqModel[] = [];

  constructor(private faqService: FaqService) {
  
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
      console.error('Error fetching FAQ data:', error);
    }
  }
 

  toggleAnswer(index: number){

    this.faqData[index].isOpened = !this.faqData[index].isOpened

  }

}
