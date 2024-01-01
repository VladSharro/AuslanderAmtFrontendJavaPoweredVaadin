import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query} from 'firebase/firestore';
import { doc } from "firebase/firestore";
import { db } from "../../environments/environment"
import { DocumentModel } from '../Models/DocumentModel';

@Injectable({
  providedIn: 'root'
})
export class AdditionalDocumentsService {

  constructor(private firestore: Firestore) { }

  async addToAdditionalDocuments(document: DocumentModel){

    const DocumentsCollection = collection(this.firestore, 'Additional_Documents');
    try {
        await addDoc(DocumentsCollection, {documentName: document.name, documentDescription: document.description, isNew: document.isFirstTime, isRenew: document.isExtending});
        return true;
    }catch (error) {
      console.error('Error adding Additional document:', error);
      return false;
    }

  }


  async getAdditionalDocuments(){
    const documentData: DocumentModel[] = [];
    const colRef = collection(db, "Additional_Documents")
    const q = query(colRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      documentData.push(new DocumentModel(doc.data()["documentName"], doc.data()["documentDescription"], doc.id, doc.data()["isNew"], doc.data()["isRenew"] ));
  });

  return documentData;

  }

async deleteAdditionalDocument(id: string){
try{
  await deleteDoc(doc(db, "Additional_Documents", id));
}catch(err){
  console.error('Error Deleting Documents document:', err);
}


}}
