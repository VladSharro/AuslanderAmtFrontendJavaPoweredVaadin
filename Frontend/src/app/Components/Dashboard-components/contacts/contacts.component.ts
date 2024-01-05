import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactModel } from '../../../Models/Contact';
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
import { ContactService } from '../../../Services/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule,FormsModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(private contservice: ContactService, private _ngZone: NgZone, private _snackBar: MatSnackBar){}

  newTitle = '';
  newValue = '';

  isDataLoading = false;
  isContactAdded = false;
  contactsData: ContactModel[] = [];
  isNewCont = true;

  pagedContactsData: ContactModel[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 1;


  

  async ShowAllContacts(){
    this.isNewCont = false;
    this.isDataLoading = true;
    this.contactsData = await this.contservice.getContacts();
    this.updatePagedData();
    this.isDataLoading = false;
    
  }
  async AddContact(){

    this.isNewCont = true;
    
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
    this.pagedContactsData = this.contactsData.slice(startIndex, endIndex);
    console.log(this.pagedContactsData)
  }

  async removeContact(index: number){
    this.isDataLoading = true;
    this.contservice.deleteContact(this.pagedContactsData[index].id!);
    this.isDataLoading = false;
    this.ShowAllContacts()
  }

  async saveContact(){
    this.isDataLoading = true;
    if(this.newTitle != '' && this.newValue != ''){
      this.isContactAdded = await this.contservice.addToContacts(new ContactModel(this.newTitle, this.newValue));
    }
    if(this.isContactAdded){
      this.newTitle = '';
      this.newValue = '';
      this.openSnackBar();
    }
    this.isDataLoading = false;
  }



  openSnackBar() {
    this._snackBar.open("Contact details added successfully", "dismiss", {
      duration: 5 * 1000,
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize!.resizeToFitContent(true));
  }

}
