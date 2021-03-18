import { Injectable } from '@angular/core';
import { BaseData } from '../classes/scenarios';
import * as histData from '../testing_files/historyData.json';
import * as invesData from '../testing_files/investigations.json';

const historyData = (<any>histData).default;
const ixData = (<any>invesData).default;


export class ScenarioDetails {
  scenarioName: string;
  specialty: string;
  difficulty: string;
  blurb: string;

  // reset() {
  //   this.scenarioName
  // }
}

export class PatientDetails {
  firstName: string;
  secondName: string;
  age: number;
  hospNum: number;
  height: number;
  weight: number;
  presentingComplaint: string;
}

interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export class Vitals {
  rr: number;
  hr: number;
  oxygenSat: number;
  temp: number;
  bp: {
    systolic: number;
    diastolic: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  ixQuantData: {};
  ixQuantKeys: Array<string>;
  questions: Array<any> = [];
  templates: Array<any> = [];

  adaptedQuestions: {} = {};
  correctQuestions: {} = {};
  adaptationsArray: Array<{}> = [];
  correctQsArray: Array<{}> = [];

  messages: Array<any> = [];

  baseData = new BaseData();
  specialties: Array<any> = this.baseData.specialties;
  difficulties: Array<string> = this.baseData.difficulties;

  scenarioDetails: ScenarioDetails = new ScenarioDetails();
  patientDetails: PatientDetails = new PatientDetails();
  // need to use this syntax to initiate nested variables:
  vitals: Vitals = { bp: {} } as Vitals;

  constructor() {
    this.questions = historyData.questions;
    this.templates = historyData.templates;

    this.ixQuantData = ixData.quantitative;
    this.ixQuantKeys = Object.keys(this.ixQuantData);
    this.ixQuantKeys.sort();
  }

  // reset all details variable to base variables.
  reset() {
    this.scenarioDetails = new ScenarioDetails();
    this.patientDetails = new PatientDetails();
    this.vitals = new Vitals();
  }

  public loadQuestions(searchField) {
    if (searchField) {
      const searchResult = [];
      for (const q of this.questions) {
        if (q.question.toLowerCase().includes(searchField)) {
          searchResult.push(q);
        }
      }
      return searchResult;
    } else {
      return this.questions;
    }
  }

  public loadTemplates(searchField) {
    if (searchField) {
      const searchResult = [];
      for (const t of this.templates) {
        if (t.name.toLowerCase().includes(searchField)) {
          searchResult.push(t);
        }
      }
      return searchResult;
    } else {
      return this.templates;
    }
  }

  loadQuantIx(searchField) {
    if (searchField) {
      const searchResult = [];
      for (const key of this.ixQuantKeys) {
        if (key.toLowerCase().includes(searchField)) {
          searchResult.push(key);
        }
      }
      return searchResult;
    } else {
      return this.ixQuantKeys;
    }
  }

  returnIxData(ix) {
    return this.ixQuantData[ix];
  }

  // Getters:
  getMessages() {
    return this.messages;
  }
  getAdaptedQs() {
    return this.adaptedQuestions;
  }
  getCorrectQs() {
    return this.correctQuestions;
  }
  getAdaptedQsArr() {
    return this.adaptationsArray;
  }
  getCorrectQsArr() {
    return this.correctQsArray;
  }

}
