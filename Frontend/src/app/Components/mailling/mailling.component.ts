import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MaillingLabels } from '../../Labels/mailling_labels';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaillingService } from '../../Services/mailling.service';
import { SnackBarService } from '../../Services/snack-bar.service';
import { WarningTypes } from '../../Models/enums/warningEnum';
import { response } from 'express';
import { ApplicationService } from '../../Services/application.service';
import { HeaderComponent } from '../../Fixed_components/header/header.component';

@Component({
  selector: 'app-mailling',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './mailling.component.html',
  styleUrl: './mailling.component.css'
})
export class MaillingComponent {
  isSuccess = false
  isLoading= false;
  maillingLabels = new MaillingLabels()
  email = ""
  constructor(private maillinService: MaillingService, private snackBarService: SnackBarService, private appService: ApplicationService){}

  async submitAndMail(){
    if(this.email != ""){
      this.isLoading = true
      const response = await this.maillinService.sendEmail(this.email)
      if(response){
        this.isSuccess = true
      }else{
        this.snackBarService.openFor(WarningTypes.mailProblem)
      }
      this.isLoading = false;
    }else{
      this.snackBarService.openFor(WarningTypes.MissingEmail)
    }
  }
  async submitWithoutMail(){
    this.isLoading = true
    let email = ""
    if(this.appService.getApplicationData().email != ""){ 
        email = this.appService.getApplicationData().email
    }
    const response =  await this.maillinService.sendEmail(email)
    console.log(response)
    if(response){
      this.isSuccess = true
    }else{
      this.snackBarService.openFor(WarningTypes.mailProblem)
    }
    this.isLoading = false;

  }
}
