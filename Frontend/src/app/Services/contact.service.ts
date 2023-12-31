import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query} from 'firebase/firestore';
import { ContactModel } from '../Models/Contact';
import { doc } from "firebase/firestore";
import { db } from "../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: Firestore) { }

  async addToContacts(cont: ContactModel){

    const contactollection = collection(this.firestore, 'Contacts');
    try {
        await addDoc(contactollection, {contactTitle: cont.title, contactValue: cont.value});
        return true;
    }catch (error) {
      console.error('Error adding contacts document:', error);
      return false;
    }

  }


  async getContacts(){
    const contactData: ContactModel[] = [];
    const colRef = collection(db, "Contacts")
    const q = query(colRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    contactData.push(new ContactModel(doc.data()["contactTitle"], doc.data()["contactValue"], doc.id ));
  });

  return contactData;

  }

async deleteContact(id: string){
try{
  await deleteDoc(doc(db, "Contacts", id));
}catch(err){
  console.error('Error Deleting Contacts document:', err);
}


}}
