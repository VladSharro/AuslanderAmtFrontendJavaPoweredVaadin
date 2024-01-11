import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { passportResponse } from '../Models/apiResponseModels/Passport';
import { enrollmentcertificateResponse } from '../Models/apiResponseModels/enrollmentcertificateResponse';
import { financialdocumentResponse } from '../Models/apiResponseModels/financialdocumentResponse';
import { healthinsuranceResponse } from '../Models/apiResponseModels/healthinsuranceResponse';


@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private http: HttpClient) { }
// local api
  // local api
  private readonly apiURL = 'http://localhost:8080'
  private readonly passportAPIExtension = '/get_data_from_passport'
  private readonly enrollmentcertificateAPIExtension = "/get_data_from_certificate_of_enrollment"
  private readonly insurancecertificateAPIExtension = "/get_data_from_health_insurance_certificate"
  private readonly financialdocumentAPIExtension =  "/get_data_from_financial_document"


 
  extractPassportData(passportFile: File){
    const apiURL = this.apiURL+this.passportAPIExtension;
    const formData = new FormData();
    formData.append('passport_image', passportFile);
    return this.callFileAPI<passportResponse>(apiURL, formData)
  }
   

  extractEnrollmentCertificatetData(enrollmentcertificateFile: File){
    const apiURL = this.apiURL+this.enrollmentcertificateAPIExtension;
    const formData = new FormData();
    formData.append('enrollment_certificate_image', enrollmentcertificateFile);
    return this.callFileAPI<enrollmentcertificateResponse>(apiURL, formData)
  }

  extractInsuranceCertificatetData(insurancecertificateFile: File){
    const apiURL = this.apiURL+this.insurancecertificateAPIExtension;
    const formData = new FormData();
    formData.append('insurance_certificate_image', insurancecertificateFile);
    return this.callFileAPI<healthinsuranceResponse>(apiURL, formData)
  }

  extractFinancialDocuemntCertificatetData(financialdocumentFile: File){
    const apiURL = this.apiURL+this.financialdocumentAPIExtension;
    const formData = new FormData();
    formData.append('financial_document_image', financialdocumentFile);
    return this.callFileAPI<financialdocumentResponse>(apiURL, formData)
  }

  

  private callFileAPI<ResponseType>(apiUrl: string, formedData: FormData){
    
   
    try{
      return lastValueFrom(
       this.http.post<ResponseType>(apiUrl, formedData)
   )  
      }catch(e){
        console.log(e)
        return []
      }
      
    
  }


  

}
