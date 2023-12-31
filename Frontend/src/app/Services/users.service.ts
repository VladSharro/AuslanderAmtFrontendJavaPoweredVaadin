import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query} from 'firebase/firestore';
import { UserModel } from '../Models/User';
import { doc } from "firebase/firestore";
import { db } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private firestore: Firestore) { }

  async addToUsers(user: UserModel){

    const usersCollection = collection(this.firestore, 'Users');
    try {
        await addDoc(usersCollection, {userEmail: user.mail, userPassword: user.password});
        return true;
    }catch (error) {
      console.error('Error adding User document:', error);
      return false;
    }

  }


  async getUsers(){
    const usersData: UserModel[] = [];
    const colRef = collection(db, "Users")
    const q = query(colRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    usersData.push(new UserModel(doc.data()["userEmail"], doc.data()["userPassword"], doc.id ));
  });

  return usersData;

  }

async deleteUser(id: string){
try{
  await deleteDoc(doc(db, "Users", id));
}catch(err){
  console.error('Error Deleting User document:', err);
}


}
}
