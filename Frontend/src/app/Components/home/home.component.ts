import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { GlobalLabels } from '../../Labels/global_labels'; 
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private breakpointObserver: BreakpointObserver, private router: Router){

  }
  globalLabels = new GlobalLabels ()
  isSmallScreen: boolean = false;
  ngOnInit() {
    // Subscribe to screen size changes
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }


  startNewApplication(){
      this.router.navigateByUrl('new-application')
  }
}