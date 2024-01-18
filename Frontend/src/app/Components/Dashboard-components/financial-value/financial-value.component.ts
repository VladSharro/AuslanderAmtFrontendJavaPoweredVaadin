import { AfterViewInit, Component } from '@angular/core';
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
import { Firestore } from 'firebase/firestore';
import { FinancialValueService } from '../../../Services/financial-value.service';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { WarningTypes } from '../../../Models/enums/warningEnum';


@Component({
  selector: 'app-financial-value',
  standalone: true,
  imports: [CommonModule,FormsModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './financial-value.component.html',
  styleUrl: './financial-value.component.css'
})
export class FinancialValueComponent implements AfterViewInit{

  constructor(private minimumValueService: FinancialValueService, private snackBarService: SnackBarService){}
  ngAfterViewInit(): void {
    this.getValue()
  }
  minimumValue = 0
  isDataLoading = false;




   private async getValue(){
    this.isDataLoading = true
    this.minimumValue = await this.minimumValueService.get()
    this.isDataLoading = false
   }

  async Save(){
    this.isDataLoading = true
    const isSuccess =  await this.minimumValueService.addToMinimumValue(this.minimumValue)
    if(isSuccess){
      this.snackBarService.openFor(WarningTypes.UpdateSuccessful)
    }else{
      this.snackBarService.openFor(WarningTypes.UpdateFailed)
    }

    this.isDataLoading = false


  }

}
