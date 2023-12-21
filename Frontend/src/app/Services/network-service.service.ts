import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  constructor(private firestore: Firestore) { }

  async addToFAQ(question: String, answer: String){

    const faqCollection = collection(this.firestore, 'FAQ');
    try {
        await addDoc(faqCollection, {faqQuestion: question, faqAnswer: answer});
    }catch (error) {
      console.error('Error adding FAQ document:', error);
      throw error; // You might want to handle the error appropriately in your application
    }

  }


  // async modifyFAQ(question: string, newAnswer: string): Promise<void> {
  //   const faqCollection = collection(this.firestore, 'FAQ');

  //   try {
  //     // Get the document reference based on the question
  //     const querySnapshot = await faqCollection.ref()('faqQuestion', '==', question).get();

  //     if (querySnapshot.size === 1) {
  //       // Only modify if a single document is found
  //       const docRef = querySnapshot.docs[0].ref;
  //       await docRef.update({ faqAnswer: newAnswer });
  //     } else {
  //       console.error('Error: Found multiple or no documents with the given question.');
  //       // Handle the error as needed
  //     }
  //   } catch (error) {
  //     console.error('Error modifying FAQ document:', error);
  //     throw error; // You might want to handle the error appropriately in your application
  //   }
  // }
}
