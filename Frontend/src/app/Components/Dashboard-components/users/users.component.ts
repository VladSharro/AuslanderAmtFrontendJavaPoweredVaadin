import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserModel } from '../../../Models/User';
import { userService } from '../../../Services/users.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgZone, ViewChild} from '@angular/core';
import { take } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { AdminLoginLabels } from '../../../Labels/admin-login_labels';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(private userService: userService, private _ngZone: NgZone, private _snackBar: MatSnackBar, private authService: AuthServiceService){}

  newEmail = '';
  newPassword = '';
  newPasswordConfirm = '';

  isDataLoading = false;
  isUserAdded = false;
  usersData: UserModel[] = [];
  isNewUser = true;

  pagedUsersData: UserModel[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 1;

  login_labels = new AdminLoginLabels()


  

  async ShowAllUsers(){
    this.isNewUser = false;
    this.isDataLoading = true;
    this.usersData = await this.userService.getUsers();
    this.updatePagedData();
    this.isDataLoading = false;
    
  }
  async AddUser(){

    this.isNewUser = true;
    
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
    this.pagedUsersData = this.usersData.slice(startIndex, endIndex);
    console.log(this.pagedUsersData)
  }

  async removeUser(index: number){
    this.isDataLoading = true;
    this.userService.deleteUser(this.pagedUsersData[index].id!);
    this.isDataLoading = false;
    this.ShowAllUsers()
  }


  async saveUser(){
    this.isDataLoading = true;
    if(this.newEmail != '' && this.newPassword != '' && this.newPassword == this.newPasswordConfirm){

      await this.authService.createUser(this.newEmail, this.newPassword);
      this.isUserAdded = await this.userService.addToUsers(new UserModel(this.newEmail, this.newPassword));
      
    }
    if(this.isUserAdded){
      this.newEmail = '';
      this.newPassword = '';
      this.newPasswordConfirm = '';
      this.openSnackBar();
    }
    this.isDataLoading = false;
  }

  flipPassowrd(index: number){

    this.pagedUsersData[index].isOpened = !this.pagedUsersData[index].isOpened
  }



  openSnackBar() {
    this._snackBar.open("User added successfully", "dismiss", {
      duration: 100 * 1000,
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize!.resizeToFitContent(true));
  }

}
