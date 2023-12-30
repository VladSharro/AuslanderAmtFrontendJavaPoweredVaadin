import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FaqModel } from '../Models/FAQModel';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private firestore: Firestore) { }

  async addToFAQ(faq: FaqModel){

    const faqCollection = collection(this.firestore, 'FAQ');
    try {
        await addDoc(faqCollection, {faqQuestion: faq.question, faqAnswer: faq.answer});
        return true;
    }catch (error) {
      console.error('Error adding FAQ document:', error);
      return false;
    }

  }


  async getFAQ(){
    const faqData: FaqModel[] = [];
    const colRef = collection(db, "FAQ")
    const q = query(colRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    faqData.push(new FaqModel(doc.data()["faqQuestion"], doc.data()["faqAnswer"], doc.id ));
  });

  return faqData;

  }

async deleteFaq(id: string){
try{
  await deleteDoc(doc(db, "FAQ", id));
}catch(err){
  console.error('Error Deleting FAQ document:', err);
}


}
}
