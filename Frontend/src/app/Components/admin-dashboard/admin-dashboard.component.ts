import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { FaqComponentComponent } from '../Dashboard-components/faq-component/faq-component.component';
import { DocumentsComponent } from '../Dashboard-components/documents/documents.component';








@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatChipsModule, MatIconModule, FaqComponentComponent, DocumentsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  isSelected = false;
  selectedValue: string | null = null;


  onSelectionChange(event: any) {
    // event.source.selected contains the new selection state
    this.selectedValue = event.source.value;

    // Perform your action when the selection changes
    if (this.isSelected) {
      console.log('Option selected! Do something.');
      // Add your custom action here
    } else {
      console.log('Option deselected! Do something else.');
      // Add your custom action when the option is deselected
    }
  }

  trackByFn(index: number, chip: any): string {
    return chip.value; // Use a unique identifier for tracking
  }

  availableColors = [
    {name: 'FAQ'},
    {name: 'Documents'},
    {name: 'Contact'},
    {name: 'Users'},
    {name: 'Application Documents'}
  ];
}
