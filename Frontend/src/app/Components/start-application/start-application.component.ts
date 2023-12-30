import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationTypeLabels } from '../../Labels/applicationType_labels';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MissingDataDialogueComponent } from '../../Dialogues/missing-data-dialogue/missing-data-dialogue.component';





@Component({
  selector: 'app-start-application',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './start-application.component.html',
  styleUrl: './start-application.component.css'
})



export class StartApplicationComponent {

  constructor(private router: Router, public dialog: MatDialog){}
  
    isFirstTime = new Boolean
    isEuCitizen = new Boolean
  
  applicationLabels = new ApplicationTypeLabels()

  applicationType = ""
  euOption=""

  applicationOptions = [this.applicationLabels.application_type_first_time_option , this.applicationLabels.application_type_extension_option]
  euOptions = [this.applicationLabels.application_Yes_option, this.applicationLabels.application_No_option]


  


  onSubmit() {
  if (this.validateInput()) {
    this.navigateToProperApplication(this.isEuCitizen, this.isFirstTime)
  }
  else{
    if (this.applicationType == ''){
      this.openMissingDataDialogue('application', '2000ms', '1500ms')
    }else{
      if(this.euOption == ''){
        this.openMissingDataDialogue('citizen',  '2000ms', '1500ms')
      }
      else{
        this.openMissingDataDialogue('ERROR',  '2000ms', '1500ms')
      }
    }

  }

    }

  validateInput(): boolean{
    switch (this.euOption){
      case this.applicationLabels.application_Yes_option:
        this.isEuCitizen = true;
        break;
      case this.applicationLabels.application_No_option:
        this.isEuCitizen = false;
        break;

      default:
        return false;  
    }

    switch (this.applicationType){
      case this.applicationLabels.application_type_first_time_option:
        this.isFirstTime = true;
        break;
      case this.applicationLabels.application_type_extension_option:
        this.isFirstTime = false;
        break;

      default:
        return false;  
    }

    return true

  }


  openMissingDataDialogue(missinData: string, enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(MissingDataDialogueComponent, {
      data: {
        problem: missinData
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }


  navigateToProperApplication(isEu: Boolean, isFirstTime: Boolean){
      if(!isEu && isFirstTime){
        this.router.navigateByUrl('nonEuFirstTimeApp')
      }
  }

}
