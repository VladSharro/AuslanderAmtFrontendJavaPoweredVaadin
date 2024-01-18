import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc} from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FinancialValueService {

  constructor(private firestore: Firestore) { }

  async addToMinimumValue(value: number){

    const valueCollection = collection(this.firestore, 'Value');
    const valueDoc = doc(valueCollection, 'currentValue')
    try {
      await setDoc(valueDoc, {mvalue: value});
        return true;
    }catch (error) {
      console.error('Error adding FAQ document:', error);
      return false;
    }

  }

  async get(){
    let value = 0;
    const colRef = collection(this.firestore, "Value")
    const q = query(colRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    value = doc.data()["mvalue"];
  });

  return value;

  }
}

