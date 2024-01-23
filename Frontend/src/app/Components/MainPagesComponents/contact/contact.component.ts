import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContactModel } from '../../../Models/Contact';
import { ContactService } from '../../../Services/contact.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../Fixed_components/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatDividerModule, MatIconModule, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit{

  isDataLoading = false;
  contactsData: ContactModel[] = [];

  constructor(private contactsService: ContactService) {
  
    this.isDataLoading = true;
  }
  
  ngAfterViewInit(): void {
    this.getContactsData();
  }
  
  async getContactsData() {
    try {
      this.contactsData = await this.contactsService.getContacts();
      
      this.isDataLoading = false;
    } catch (error) {
      console.error('Error fetching contacts data:', error);
    }
  }
 

  toggleAnswer(index: number){

    this.contactsData[index].isOpened = !this.contactsData[index].isOpened

  }
}

