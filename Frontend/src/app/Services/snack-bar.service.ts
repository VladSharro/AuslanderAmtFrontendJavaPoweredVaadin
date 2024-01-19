import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningTypes } from '../Models/enums/warningEnum';
import { HorizontalAlignment } from 'igniteui-angular';



@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }


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
    }
    }
   
     
  }
