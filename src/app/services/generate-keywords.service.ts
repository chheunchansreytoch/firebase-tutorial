import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GenerateKeywordsService {

  constructor() { }

  static toCapitalize(value: string) {
    let string = null;
    if (value) string = value.toUpperCase().toString().trim();

    return string;
  }

}

export const createKeywords = (name: string) => {
  const arrName: any[] = [];
  let nextLetter = ''
  name.trim().split(/[ .\-_\s ]/).forEach(letter => {
    let nextWord = ''
    return (letter.split('').forEach(word => {
      nextWord += word;

      arrName.push(GenerateKeywordsService.toCapitalize(nextWord)?.toLocaleLowerCase());

    }))
  })
  name.trim().split('').forEach(word => {
    nextLetter += word;
    arrName.push(GenerateKeywordsService.toCapitalize(nextLetter));
  })
  return arrName
}

export const generateKeywords = (names: string[]) => {
  const keywordName = _.flattenDeep(_.map(names, (m) => createKeywords(m))).filter(a => a)
  return [
    ...new Set([
      '~N/A~',
      ...keywordName
    ])
  ];
}
