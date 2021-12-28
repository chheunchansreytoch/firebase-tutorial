import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore
  ) { }

  dbRef() {
    return this.afs;
  }

  firestore() {
    return this.afs.firestore;
  }

  batch() {
    return this.afs.firestore.batch();
  }

  createId() {
    return this.afs.createId();
  }

  counterRef() {
    return this.afs.collection('counter');
  }

  userRef() {
    return this.afs.collection('users', ref => ref.where('isDeleted', '==', false).orderBy('firstname'));
  }

  userRefs(){
    return this.afs.collection('newuser', ref => ref.where('isDeleted', '==', false).orderBy('firstname'));
  }
}
