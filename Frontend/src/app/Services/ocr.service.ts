import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { passportResponse } from '../Models/apiResponseModels/Passport';
import { enrollmentcertificateResponse } from '../Models/apiResponseModels/enrollmentcertificateResponse';
import { financialdocumentResponse } from '../Models/apiResponseModels/financialdocumentResponse';
import { healthinsuranceResponse } from '../Models/apiResponseModels/healthinsuranceResponse';
import { ApplicationService } from './application.service';



@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private http: HttpClient, private ApplicationService: ApplicationService) {

   }
// local api
  // local api
  // private readonly apiURL = 'http://localhost:8080'
  private readonly apiURL = 'http://132.231.1.189:8080'
  private readonly passportAPIExtension = '/get_data_from_passport'
  private readonly enrollmentcertificateAPIExtension = '/get_data_from_certificate_of_enrollment'
  private readonly insurancecertificateAPIExtension = '/get_data_from_health_insurance_certificate'
  private readonly financialdocumentAPIExtension =  '/get_data_from_financial_document'
  private readonly generateapplicationformAPIExtension =  '/generate_application_form'



 
  extractPassportData(passportFile: File){
    const apiURL = this.apiURL+this.passportAPIExtension;
    const formData = new FormData();
    formData.append('passport_image', passportFile);
    return this.callFileAPI<passportResponse>(apiURL, formData)
  }
   

  extractEnrollmentCertificatetData(enrollmentcertificateFile: File){
    const apiURL = this.apiURL+this.enrollmentcertificateAPIExtension;
    const formData = new FormData();
    formData.append('certificate_of_enrollment_image', enrollmentcertificateFile);
    return this.callFileAPI<enrollmentcertificateResponse>(apiURL, formData)
  }

  extractInsuranceCertificatetData(insurancecertificateFile: File){
    const apiURL = this.apiURL+this.insurancecertificateAPIExtension;
    const formData = new FormData();
    formData.append('health_insurance_certificate', insurancecertificateFile);
    return this.callFileAPI<healthinsuranceResponse>(apiURL, formData)
  }

  extractFinancialDocuemntCertificatetData(financialdocumentFile: File){
    const apiURL = this.apiURL+this.financialdocumentAPIExtension;
    const formData = new FormData();
    formData.append('financial_document', financialdocumentFile);
    return this.callFileAPI<financialdocumentResponse>(apiURL, formData)
  }


  generateApplicationForm(){
    const apiURL = this.apiURL+this.generateapplicationformAPIExtension;
    const documentsData: File[] = []
    const appData = new FormData()

    let documents = this.ApplicationService.generateDocumentsFrom()
      documents.forEach((value: File, key: string) => {
        documentsData.push(value)
      })
    let object = this.ApplicationService.generateFinalForm()
    let signature = this.ApplicationService.getSignature();
    if(signature != null){
      appData.append( "signature_image", signature)

    }

     documentsData.forEach ((file) => {
       appData.append("documents", file)

   })

    console.log(JSON.stringify(object))
    appData.append("user_data", JSON.stringify(object))

    return this.generateApplication(apiURL, appData)
  }

  private async generateApplication(apiURL: string, appData: FormData,){
    
    try{
      
      const response = await lastValueFrom(this.http.post(apiURL, appData, { observe: 'response', responseType: 'blob' }));
          console.log(response);

          if (response.status === 200) {

               return response.body as Blob;
           } else {
             return null;
            }
            } catch (e) {
            console.log(e);
          return null;
      }
  }
  

  private async callFileAPI<ResponseType>(apiUrl: string, formedData: FormData){
    try{
      const response = await lastValueFrom(this.http.post<ResponseType>(apiUrl, formedData, {observe: 'response'}));
      if(response.status === 200){
        return response.body as ResponseType
      }
      else{
        return null
      }
    }catch(e){
        console.log(e)
        return []
      } 
  }


  

  

}
