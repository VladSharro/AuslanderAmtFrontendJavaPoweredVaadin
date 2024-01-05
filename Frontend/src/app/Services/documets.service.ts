import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query} from 'firebase/firestore';
import { doc } from "firebase/firestore";
import { db } from "../../environments/environment"
import { DocumentModel } from '../Models/DocumentModel';

@Injectable({
  providedIn: 'root'
})
export class DocumetsService {

  constructor(private firestore: Firestore) { }

  async addToDocuments(document: DocumentModel){

    const DocumentsCollection = collection(this.firestore, 'Documents');
    try {
        await addDoc(DocumentsCollection, {documentName: document.name, documentDescription: document.description});
        return true;
    }catch (error) {
      console.error('Error adding FAQ document:', error);
      return false;
    }

  }


  async getDocuments(){
    const documentData: DocumentModel[] = [];
    const colRef = collection(db, "Documents")
    const q = query(colRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      documentData.push(new DocumentModel(doc.data()["documentName"], doc.data()["documentDescription"], doc.id ));
  });

  return documentData;

  }

async deleteDocuments(id: string){
try{
  await deleteDoc(doc(db, "Documents", id));
}catch(err){
  console.error('Error Deleting Documents document:', err);
}


}
}
