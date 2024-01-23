import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { stepperLabels } from '../../Labels/Stepper-labels';
import { BasicDataComponent } from '../Application-components/basic-data/basic-data.component';
import { ResidenceDataComponent } from '../Application-components/residence-data/residence-data.component';
import { StayDataRenewalComponent } from '../Application-components/stay-data-renewal/stay-data-renewal.component';
import { FinancialSupportDataComponent } from '../Application-components/financial-support-data/financial-support-data.component';
import { OffenceDataComponent } from '../Application-components/offence-data/offence-data.component';
import { PhotoDataComponent } from '../Application-components/photo-data/photo-data.component';
import { DoneComponent } from '../Application-components/done/done.component';
import { AdiitionalDocumentsComponent } from '../Application-components/adiitional-documents/adiitional-documents.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FamilyDataComponent } from '../Application-components/family-data/family-data.component';
import { SnackBarService } from '../../Services/snack-bar.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-non-eu-renew-app',
  standalone: true,
  imports: [CommonModule,
    MatStepperModule,
    MatRadioModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatTooltipModule,
    BasicDataComponent,
    FamilyDataComponent,
    ResidenceDataComponent,
    StayDataRenewalComponent,
    FinancialSupportDataComponent,
    OffenceDataComponent,
    PhotoDataComponent,
    AdiitionalDocumentsComponent,
    DoneComponent],
  templateUrl: './non-eu-renew-app.component.html',
  styleUrl: './non-eu-renew-app.component.css'
})
export class NonEuRenewAppComponent {

  constructor(private snackBarService: SnackBarService, private activeRouter: ActivatedRoute) {}
  

  stepperLabels = new stepperLabels();

  isBasicDataValid = false;

  checkFirstStepperChange() {
    return this.isBasicDataValid;
  }

  onCheckFirstStepperChange(isValid: boolean) {
    this.isBasicDataValid = isValid;
  }


  isResidenceDataValid = false;

  checkThirdStepperChange() {
    return this.isResidenceDataValid;
  }

  onCheckThirdStepperChange(isValid: boolean) {
    this.isResidenceDataValid = isValid;
  }
  

  isSupportDataValid = false;

  checkFifthStepperChange() {
    return this.isSupportDataValid;
  }

  onCheckFifthStepperChange(isValid: boolean) {
    this.isSupportDataValid = isValid;
  }

  
  
  //////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////// passport section ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////


  



  //////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////// Residence section ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////


  





  /////////////////////////////////////////////////////////////
  ///////////////////////Family Section ///////////////////////
  /////////////////////////////////////////////////////////////





  ///////////////////////////////////////////////////////
  ///////////////////////STAY DATA///////////////////////
  ///////////////////////////////////////////////////////


  



  ///////////////////////////////////////////////////////
  ///////////////////////SUPPORT DATA////////////////////
  ///////////////////////////////////////////////////////

  


///////////////////////////////////////////////////////
///////////////////////OFFENCES DATA///////////////////
///////////////////////////////////////////////////////




///////////////////////////////////////////////////////
///////////////////////PHOTO DATA//////////////////////
///////////////////////////////////////////////////////




}
