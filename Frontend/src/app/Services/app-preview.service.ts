import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppPreviewService {

  constructor() { }

  openApplicationFile(fileUrl: string):void{

    window.open(fileUrl, 'Application_preview');
  }
}
