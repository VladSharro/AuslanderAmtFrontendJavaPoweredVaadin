import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationTypeLabels } from '../../Labels/applicationType_labels';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SnackBarService } from '../../Services/snack-bar.service';
import { WarningTypes } from '../../Models/enums/warningEnum';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../Fixed_components/header/header.component';
import { AppPositionService } from '../../Services/app-position.service';






@Component({
  selector: 'app-start-application',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule, MatCardModule, MatButtonModule, HeaderComponent],
  templateUrl: './start-application.component.html',
  styleUrl: './start-application.component.css'
})



export class StartApplicationComponent implements OnInit{

  constructor(private router: Router, private snackBarService: SnackBarService, private route: ActivatedRoute, private appPosition: AppPositionService){}
  ngOnInit(): void {
  this.checkIfContinue()
  }

    isContinue = false;
    isFirstTime = false
    isRenew = false;
  
  applicationLabels = new ApplicationTypeLabels()

  applicationType = ""

  applicationOptions = [this.applicationLabels.application_type_first_time_option , this.applicationLabels.application_type_extension_option]


  


  onSubmit() {
  if (this.validateInput()) {
  
    this.navigateToProperApplication()
  }
  else{
    
    this.snackBarService.openFor(WarningTypes.missingApplicationType);

  }

    }

  validateInput(): boolean{
    
    switch (this.applicationType){
      case this.applicationLabels.application_type_first_time_option:
        this.isFirstTime = true;
        break;
      case this.applicationLabels.application_type_extension_option:
        this.isRenew = true              
        break;

      default:
        return false;  
    }

    return true

  }


  checkIfContinue(){
    this.route.params.subscribe(params => {
      this.isContinue= params['id'];
     
    });
  }
  

  navigateToProperApplication(){
      if(this.isFirstTime){
        this.appPosition.isOutAllowed = false;
        this.router.navigateByUrl('nonEuFirstTimeApp')

      }
      if(this.isRenew){
        this.appPosition.isOutAllowed = false;
        this.router.navigateByUrl('nonEuRenewApp')
      }
  }

}
