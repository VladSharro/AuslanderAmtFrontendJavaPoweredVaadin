import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Fixed_components/header/header.component';
import { FooterComponent } from './Fixed_components/footer/footer.component';
import { DownloadApplicationComponent } from './Fixed_components/download-application/download-application.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, DownloadApplicationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title=""
}
