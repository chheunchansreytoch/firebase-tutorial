import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import * as _ from 'lodash';
import firebase from 'firebase/compat';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor() { }

  static uuidkey() {
    return uuidv4();
  }

  static pageKey() {
    return Number(moment().format('YYYYMMDDHmms'))
  }

  static dateKey() {
    return Number(moment().format('YYYYMMDD'))
  }

  static pageKey0(date: Date) {
    return Number(moment(date).format('YYYYMMDDHHmmss'))
  }

  static dateKey0(date: Date) {
    return Number(moment(date).format('YYYYMMDD'))
  }
}

export function pushToObject(doc: firebase.firestore.DocumentSnapshot) {
  if (!doc.exists) return null;
  return { ...doc.data(), key: doc.id}
}

export function pushToArray(snapshot: firebase.firestore.QuerySnapshot<DocumentData>):any {
  if (snapshot.empty) return [];
  return snapshot.docs.map((m: {data: () => any; }) => ({ ...m.data() }));
}

export function groupByData(data: Array<any>, field: string, fields?: string[] | string) {
  const rows = _.chain(data).groupBy(fields? fields : field).map((value, key) => {
    const index = data.findIndex((item) => item.key === key);
    return { [field]: data[index], data: value};
  }).value()
  return rows;
}


