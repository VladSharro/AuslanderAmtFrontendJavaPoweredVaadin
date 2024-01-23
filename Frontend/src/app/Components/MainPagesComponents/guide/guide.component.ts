import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../../Fixed_components/header/header.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, MatCardModule,  MatSlideToggleModule, MatButtonModule, HeaderComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {

}
