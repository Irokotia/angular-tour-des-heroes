import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Weapon } from './data/weapon';
import { MessageService } from './message.service';

import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Hero} from './data/hero';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url = 'weapons';

  constructor(private messageService: MessageService,
              private db: AngularFirestore) { }

  /*public getWeapons(): Observable<Weapon[]> {
    // TODO: send the message _after_ fetching the weapons
    this.messageService.add('WeaponService: fetched weapons');
    return of(WEAPONS);
  }*/
  public getWeapons(): Observable<Weapon[]> {
    //
    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          // log
          console.log('getWeapons()');

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();

            // New Hero
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = item.payload.doc.id;
            weapon.id = id;

            // log
            console.log('   hero ' + id);

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }
  public getWeapon(id: string): Observable<Weapon> {
    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Hero
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // log
          console.log('getWeapon(' + id + ')');

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }
  // Ajout d'une weapon
  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>(WeaponService.url).add(Object.assign({}, weapon));
  }

  // Modification d'une weapon
  updateWeapon(id: string,weapon: Weapon) {

    // Update document
    this.getWeaponDocument(id).update(Object.assign({}, weapon));
  }

  // Suppression d'une weapon
  deleteWeapon(id: string) {

    // Delete the document
    this.getWeaponDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id de l'arme
  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponService.url + `/` + id);
  }
}
