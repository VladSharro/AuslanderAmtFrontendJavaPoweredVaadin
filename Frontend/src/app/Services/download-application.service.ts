import { Injectable } from '@angular/core';
import { ApplicationService } from './application.service';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FinalForm } from '../Models/BackendModels/FinalForm';
import {  plainToInstance } from 'class-transformer';
import { Application } from '../Models/Application';
import { FinancialDocument } from '../Models/FinancialDocument';



@Injectable({
  providedIn: 'root'
})
export class DownloadApplicationService {

  constructor(private applicationService: ApplicationService) {}
  private extractedFiles: { name: string, blob: Blob }[] = [];
  private applicationFiles: {fileName: string, file: File}[] = [];
  private tempFinancialDocuments: FinancialDocument[] = []
  private tempAdditionDocument = new Map<string, File>()

  downloadApplication(){

    let applicationData = this.applicationService.getApplicationData()
    let applicationDocuments = this.applicationService.generateDocumentsFrom()
    let signatureFile = this.applicationService.getSignature();
    if(signatureFile != null){
      applicationDocuments.set("signature", signatureFile!)
    }
    const application = new Blob([JSON.stringify(applicationData)], { type: 'application/json' });

    let zip: JSZip = new JSZip();
    applicationDocuments.forEach((value: File, key: string)  => {
      
      zip.file(key+"."+(value.name.split(".")[1]), value, { binary: true });
    })

    zip.file("application.json", application)

    zip.generateAsync({ type: 'blob' }).then((zipBlob: Blob) => {
      // Download the zip file
      saveAs(zipBlob, 'Application.zip');
    });

  }



  async extract(zipFile: File) {
    const zip = new JSZip();
  
    try {
      const zipContent = await zip.loadAsync(zipFile);
  
      const extractPromises: Promise<void>[] = [];
  
      zipContent.forEach((relativePath, zipEntry) => {
        const extractPromise = zipEntry.async('blob').then((fileBlob: { type: any }) => {

          this.extractedFiles.push({ name: relativePath, blob: fileBlob as Blob });
          console.log(`Extracted file: ${relativePath}, Type: ${fileBlob.type}`);
        });
  
        extractPromises.push(extractPromise);
      });
  
      await Promise.all(extractPromises);
  
      this.parseFiles();
      this.applicationService.setAdditionalDocuments(this.tempAdditionDocument)
      this.applicationService.setApplicationFinancial(this.tempFinancialDocuments)
  
      return true;
    } catch (error) {
      return false;
    }
  }


   parseFiles(){
    this.extractedFiles.forEach((element) =>{
      this.applicationFiles.push({fileName: element.name, file: new File([element.blob], element.name)})
    });

    this.applicationFiles.forEach(async (file)=>{
      if(file.fileName == "application.json"){
         try{
          const jsonContent = await file.file.text()
        //console.log(jsonContent);
        //const jsonObject = await JSON.parse(jsonContent);
        const userObject = plainToInstance(Application, JSON.parse(jsonContent));
        
        this.applicationService.setApplicationData(userObject)  
        this.applicationService.setApplicationType(true);     
    }catch(error){
          console.log(error)
        }
      }else{
        switch (file.fileName.slice(0, -4)){
          case "Passport":
            this.applicationService.setApplicationPassport(file.file)
            break;
          case "visa":
            this.applicationService.setApplicationVisa(file.file)
            break;
          case "signature":
            this.applicationService.setApplicationSignature(file.file)
            break;
          case "photo":
            this.applicationService.setApplicationPhoto(file.file)
            break;
          case "enrollment":
            this.applicationService.setApplicationEnrollment(file.file)
            break;
          case "registration":
            this.applicationService.setApplicationRegistration(file.file)
            break;
          case "insurance":
            this.applicationService.setApplicationInsurance(file.file)
            break;
          default:
            this.mapToFinancialPrAdditional(file)
            break;
        }
        }
    });
  }

 mapToFinancialPrAdditional(file: {fileName: string, file: File}){
  const ifFinancialName = file.fileName.slice(0, -5)
  if( ifFinancialName == "Blocked Account Confirmation" || ifFinancialName == "Scholarship confirmation" || ifFinancialName == "Work Contract"){
    let tempDocument = new FinancialDocument()
    tempDocument.fileType = ifFinancialName
    tempDocument.file = file.file
    this.tempFinancialDocuments.push(tempDocument)
  }else{
    this.tempAdditionDocument.set(file.fileName.slice(0, -4), file.file)
  }
 }


  

}
