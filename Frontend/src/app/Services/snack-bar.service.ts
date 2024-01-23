import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningTypes } from '../Models/enums/warningEnum';
import { HorizontalAlignment } from 'igniteui-angular';
import { AppPositionService } from './app-position.service';



@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar, private allowSnackBar: MatSnackBar, private appPosition: AppPositionService) { }


  openNotSavedYetReminder(){
    this._snackBar.open("Your Data is not saved!", "Ok",{
    horizontalPosition: "end",
    verticalPosition: "top"
  })
  }

  openFor(msgType: WarningTypes) {
    switch (msgType){
      case WarningTypes.dataSaved:
        this._snackBar.open("Save is Succesfull", "dismiss", {
          duration: 5 * 1000,
        });
        break;
      
      case WarningTypes.confirmNeeded:
        this._snackBar.open("Some data are different from the extracted one from the document, Please confirm by checking the slidebar", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

      case WarningTypes.fileError:
        this._snackBar.open("There was a problem extracting data from your document", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

      case WarningTypes.wrongEnrollmentDate:
        this._snackBar.open("Your Enrollment Certificate is expired", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

      case WarningTypes.FormCreated:
        this._snackBar.open("Your Application is created successfully", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

        case WarningTypes.FormCreatError:
        this._snackBar.open("There was a problem generating your Application", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

        case WarningTypes.UpdateFailed:
          this._snackBar.open("Updating Failed", "Ok", {
          duration: 5 * 1000,
      
        });
        break;
    
      case WarningTypes.UpdateSuccessful:
        this._snackBar.open("Update is Successfull", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

        case WarningTypes.ExtractFailed:
        this._snackBar.open("Sorry!, the extraction of data failed, please start a new application", "Ok", {
          duration: 5 * 1000,
      
        });
        break;

        case WarningTypes.ExtractSuccess:
        this._snackBar.open("Your data is extracted successfully, please press continue", "Ok", {
          duration: 5 * 1000,
      
        });
        break;
        case WarningTypes.MissingEmail:
          this._snackBar.open("The email can't be empty", "Ok", {
            duration: 5 * 1000,
        
          });
          break;
    }
    }

  openForAllowOut(){
    const snackBarRef = this.allowSnackBar.open("This action will move you away from the application and loss your data, Do you want to allow this?", "Allow", {
      duration: 5 * 1000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.appPosition.isOutAllowed = true
    })


  }
     
  }

