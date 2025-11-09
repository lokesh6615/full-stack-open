import { NewPatient, Gender } from './types';
import { z } from 'zod';

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.string().date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.nativeEnum(Gender).parse(object.gender),
      occupation: z.string().parse(object.occupation),
      entries: z.array(z.string()).parse(object.entries),
    };

    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
