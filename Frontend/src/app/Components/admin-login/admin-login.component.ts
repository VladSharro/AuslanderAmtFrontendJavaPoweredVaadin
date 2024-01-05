import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/auth-service.service';
import { AdminLoginLabels } from '../../Labels/admin-login_labels';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';







@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent{
  emailForm: FormGroup;
  isUserLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login_labels = new AdminLoginLabels();
  // userName = '';
  // password = '';

  
  


  async onSubmit(){
    this.isUserLoading = true;
    if (this.emailForm.valid) {
      const emailValue = this.emailForm.get('email')?.value;
      const passwordValue = this.emailForm.get('password')?.value;

     var response = await  this.authService.signInAdmin(emailValue, passwordValue);
     this.isUserLoading = false;
     if( response == true){
      this.router.navigateByUrl('adminDashboard')
     }

      // Now you can use the emailValue and passwordValue as needed.
      // For example, you might want to send them to a server, perform authentication, etc.
    }
  }
}
