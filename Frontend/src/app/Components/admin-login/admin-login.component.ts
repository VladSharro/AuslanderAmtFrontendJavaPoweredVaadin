import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent{
  constructor(private firestore: Firestore){}
  // ngOnInit(): void {
  //   const testCollection = collection(this.firestore, 'test');
  //   addDoc(testCollection, {text: 'FireStore test 1'});
  // }

}
