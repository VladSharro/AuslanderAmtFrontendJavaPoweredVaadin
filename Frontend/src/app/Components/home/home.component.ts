import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { GlobalLabels } from '../../Labels/global_labels'; 
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterModule } from '@angular/router';
import { ApplicationService } from '../../Services/application.service';
import { HeaderComponent } from '../../Fixed_components/header/header.component';
import { FooterComponent } from '../../Fixed_components/footer/footer.component';
import { AppPositionService } from '../../Services/app-position.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatButtonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private applicationService: ApplicationService, private appPosition: AppPositionService){
    this.appPosition.isOutAllowed = true
  }
  globalLabels = new GlobalLabels ()
  isSmallScreen: boolean = false;
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }


  startNewApplication(){
    this.applicationService.setApplicationType(false)
    this.router.navigateByUrl(`/new-application`);

  }
  continueApplication(){
    this.applicationService.setApplicationType(false)

    this.router.navigateByUrl('continue-application')
}
}
