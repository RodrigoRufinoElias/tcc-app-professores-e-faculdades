import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Faculdade } from '../models/faculdade.model';

@Injectable({
  providedIn: 'root'
})
export class FaculdadeService {

  private faculdadeCollection: AngularFirestoreCollection<Faculdade> = this.firestore.collection('faculdades');

  constructor(private firestore: AngularFirestore) {}

  getFaculdades(): Observable<Faculdade[]> {
    return this.faculdadeCollection.valueChanges();
  }

  addFaculdade(f: Faculdade) {
    this.faculdadeCollection.add(f);
  }
}
