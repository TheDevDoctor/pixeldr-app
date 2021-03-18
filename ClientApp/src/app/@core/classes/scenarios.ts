import { PatientDetails } from '../data/building.service';

export class ScenarioPreview {
    name: string;
    author: string;
    image: string;
    subject: string;
    difficulty: string;
    rating: number;
    plays: number;
    description: string;
    published: boolean;
  }

  export class Scenario {
    name: string;
    author: string;
    image: string;
    subject: string;
    difficulty: string;
    description: string;
    patientDetails: PatientDetails;
    vitals: Vitals;
    history: {
      correct: {},
      adaptedResponses: {}
    };
  }

  export class BaseData {
    difficulties = ['Easy', 'Mediocre', 'Hard', 'House'];
    specialties: Array<any> = [
      {
        name: 'Cardiology'
      },
      {
        name: 'Respiratory'
      },
      {
        name: 'Gastroenterology'
      },
      {
        name: 'Endocrinology and Diabetes'
      }
    ];
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
