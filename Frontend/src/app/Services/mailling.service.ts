import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaillingService {

  private applicationFile: File | null = null
  private readonly apiURL = 'http://132.231.1.189:8080/send_email'

  constructor(private http: HttpClient) { }

  setApplicationFile(applicationFile: File){
    this.applicationFile = applicationFile
  }

  sendEmail(mail: string){
    let apiData = new FormData()
    apiData.append("document", this.applicationFile!)
    if(mail != ""){
      apiData.append("user_email_address", mail)
    }
    return this.callMailApi(this.apiURL, apiData)
  }

  private async callMailApi(apiUrl: string, formedData: FormData){
    try{
      const response = await lastValueFrom(this.http.post(apiUrl, formedData, {observe: 'response'}));
      console.log(response)
      if(response.status === 200){
        return true
      }
      else{
        return false
      }
    }catch(e){
        console.log(e)
        return false
      } 
  }
}
