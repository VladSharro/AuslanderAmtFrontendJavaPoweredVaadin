import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { stepperLabels } from '../../Labels/Stepper-labels';
import { BasicDataComponent } from '../Application-components/basic-data/basic-data.component';
import { ResidenceDataComponent } from '../Application-components/residence-data/residence-data.component';
import { StayDataComponent } from '../Application-components/stay-data/stay-data.component';
import { FinancialSupportDataComponent } from '../Application-components/financial-support-data/financial-support-data.component';
import { OffenceDataComponent } from '../Application-components/offence-data/offence-data.component';
import { PhotoDataComponent } from '../Application-components/photo-data/photo-data.component';
import { DoneComponent } from '../Application-components/done/done.component';
import { AdiitionalDocumentsComponent } from '../Application-components/adiitional-documents/adiitional-documents.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FamilyDataComponent } from '../Application-components/family-data/family-data.component';
import { SnackBarService } from '../../Services/snack-bar.service';
import { DownloadApplicationComponent } from '../../Fixed_components/download-application/download-application.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../Fixed_components/header/header.component';





@Component({
  selector: 'app-non-eu-first-app',
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
    StayDataComponent,
    FinancialSupportDataComponent,
    OffenceDataComponent,
    PhotoDataComponent,
    AdiitionalDocumentsComponent,
    DoneComponent,
    DownloadApplicationComponent,
    HeaderComponent
  ],
  templateUrl: './non-eu-first-app.component.html',
  styleUrl: './non-eu-first-app.component.css'
})


export class NonEuFirstAppComponent {

  labels = new stepperLabels()
  @ViewChild('stepper') stepper!: MatStepper;


  downloadAppLinkClicked(linkName: string){
    if (linkName == this.labels.download_application){
      return ;
    }
  }


  constructor(private snackBarService: SnackBarService, private activeRouter: ActivatedRoute) {}

  stepperLabels = new stepperLabels();

  pIsContinue = false;

  


 
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
