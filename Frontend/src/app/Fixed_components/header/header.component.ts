import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {headerLabels} from '../../Labels/header_labels'
import { Router } from '@angular/router';
import { AppPositionService } from '../../Services/app-position.service';
import { SnackBarService } from '../../Services/snack-bar.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private appPosition: AppPositionService, private snackBarService: SnackBarService){}
  labels = new headerLabels()

  headerLinkClicked(linkName: string){

    var destinationLink = ""
    switch (linkName){
      case this.labels.home_page_button_label:
        destinationLink = "Home"
        break;
      case this.labels.newbie_guide_page_button_label:
        destinationLink = "Guide"
        break;
      case this.labels.requently_asked_questions_page_button_label:
        destinationLink = "FAQ"
        break;
      case this.labels.documents_information_page_button_label:
        destinationLink = "Documents"
        break;
      case this.labels.contact_page_button_label:
        destinationLink = "Contact"
        break;
      case this.labels.admin_login_button_label:
        destinationLink = "adminLogIn"
        break;
      default:
        break;

    }
    if(this.appPosition.isOutAllowed){
      this.router.navigateByUrl(destinationLink);
    }else{
      this.snackBarService.openForAllowOut()
      const newWindow = window.open(destinationLink, '_blank');
  if (newWindow) {
    // Optionally focus the new window
    newWindow.focus();
  }
    }

  }

}
